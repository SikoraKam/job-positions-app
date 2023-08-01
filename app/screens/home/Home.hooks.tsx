import { FC, Ref, useEffect, useState } from "react";
import { HomeScreen } from "./Home.screen";
import { useBoundStore } from "../../store/useBoundStore";
import { useRef } from "react/index";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { emailApplicationMessageConstructor } from "../../utils/emails";
import { sendEmail } from "../../services/api/emails.service";
import {
  getAvailableJobPositions,
  getRecommendedJobs,
} from "../../services/api/offers.service";
import { JobPositionDetails } from "../../types/positions.types";

export const Home: FC = () => {
  const recommendedOffers = useBoundStore((state) => state.recommendedOffers);
  const addToSavedForFuture = useBoundStore(
    (state) => state.addToSavedForFuture
  );
  const reinitializeRecommendedOffers = useBoundStore(
    (state) => state.reinitializeRecommendedOffers
  );
  const addToAccepted = useBoundStore((state) => state.addToAccepted);
  const addToRejected = useBoundStore((state) => state.addToRejected);
  const userData = useBoundStore((state) => state.userData);
  const savedResumeUri = useBoundStore((state) => state.savedResumeUri);

  const carouselRef: Ref<ICarouselInstance> = useRef(null);

  const [initialRecommendedOffers, setInitialRecommendedOffers] =
    useState<JobPositionDetails[]>();

  useEffect(() => {
    if (!reinitializeRecommendedOffers) return;

    (async () => {
      console.log("WYKONAŁEM SIE");
      if (typeof savedResumeUri === undefined) return;
      const allJobPositions = await getAvailableJobPositions();

      if (savedResumeUri) {
        const recommendedOffers = await getRecommendedJobs(
          savedResumeUri,
          allJobPositions
        );

        // const recommendedOffers = JobPositionsMock;
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
