import { FC, Ref, useEffect, useState } from "react";
import { HomeScreen } from "./Home.screen";
import { useRef } from "react/index";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { emailApplicationMessageConstructor } from "../../utils/emails";
import { sendEmail } from "../../services/api/emails.service";
import {
  getAvailableJobPositions,
  getRecommendedJobs,
} from "../../services/api/offers.service";
import { JobPositionDetails } from "../../types/positions.types";
import { useOffersStore } from "../../store/offersStore";
import { useUserStore } from "../../store/userStore";

export const Home: FC = () => {
  const recommendedOffers = useOffersStore((state) => state.recommendedOffers);
  const addToSavedForFuture = useOffersStore(
    (state) => state.addToSavedForFuture
  );
  const reinitializeRecommendedOffers = useOffersStore(
    (state) => state.reinitializeRecommendedOffers
  );
  const addToAccepted = useOffersStore((state) => state.addToAccepted);
  const addToRejected = useOffersStore((state) => state.addToRejected);
  const userData = useUserStore((state) => state.userData);
  const savedResumeUri = useUserStore((state) => state.savedResumeUri);

  const carouselRef: Ref<ICarouselInstance> = useRef(null);

  const [initialRecommendedOffers, setInitialRecommendedOffers] =
    useState<JobPositionDetails[]>();

  useEffect(() => {
    if (!reinitializeRecommendedOffers) return;

    (async () => {
      if (typeof savedResumeUri === undefined) return;
      const allJobPositions = await getAvailableJobPositions();

      if (savedResumeUri) {
        const recommendedOffers = await getRecommendedJobs(
          savedResumeUri,
          allJobPositions
        );

        reinitializeRecommendedOffers(recommendedOffers);
        setInitialRecommendedOffers(recommendedOffers);
      }
    })();
  }, [savedResumeUri, reinitializeRecommendedOffers]);

  const applyForPosition = async () => {
    if (!userData || !savedResumeUri) {
      console.error("Brak pól");
      return;
    }

    const emailFormData = emailApplicationMessageConstructor(
      recommendedOffers[0],
      {
        nameAndLastName: userData?.name,
        email: userData?.email,
        resumeUri: savedResumeUri,
      }
    );

    await sendEmail(emailFormData);
  };

  const acceptOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: async () => {
        addToAccepted(recommendedOffers[0]);
        await applyForPosition();
      },
    });
  };

  const rejectOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: () => addToRejected(recommendedOffers[0]),
    });
  };

  const saveOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: () => addToSavedForFuture(recommendedOffers[0]),
    });
  };

  return (
    <HomeScreen
      arrayOfOffersForCarousel={
        initialRecommendedOffers?.length
          ? [...initialRecommendedOffers, null]
          : []
      }
      {...{
        acceptOffer,
        rejectOffer,
        saveOffer,
        carouselRef,
      }}
    />
  );
};
