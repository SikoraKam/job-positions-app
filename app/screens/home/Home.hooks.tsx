import { FC, Ref, useEffect, useMemo, useState } from "react";
import { HomeScreen } from "./Home.screen";
import { useRef } from "react/index";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { emailApplicationMessageConstructor } from "../../utils/emails";
import { getRecommendedJobs } from "../../services/api/offers.service";
import { JobPositionDetails } from "../../types/positions.types";
import { useOffersStore } from "../../store/offersStore";
import { useUserStore } from "../../store/userStore";
import {
  postAcceptedOfferId,
  postRejectedOfferId,
  postSavedOfferId,
} from "../../services/api/users.service";
import { filterAvailablePositionsWhichAreNotProcessedByUser } from "../../utils/helpers";
import { shallow } from "zustand/shallow";

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
  const [acceptedOffers, rejectedOffers, savedForFutureOffers] = useOffersStore(
    (state) => [
      state.acceptedOffers,
      state.rejectedOffers,
      state.savedForFutureOffers,
    ],
    shallow
  );
  const processedOffers = useMemo(() => {
    if (!acceptedOffers || !rejectedOffers || !savedForFutureOffers)
      return undefined;
    else return [...acceptedOffers, ...rejectedOffers, ...savedForFutureOffers];
  }, [acceptedOffers, rejectedOffers, savedForFutureOffers]);

  const carouselRef: Ref<ICarouselInstance> = useRef(null);

  const [initialRecommendedOffers, setInitialRecommendedOffers] =
    useState<(JobPositionDetails | null)[]>();

  useEffect(() => {
    console.log(processedOffers);
    if (!reinitializeRecommendedOffers || !processedOffers) return;

    if (initialRecommendedOffers?.length) return;

    (async () => {
      if (typeof savedResumeUri === "undefined") return;

      const availablePositions =
        await filterAvailablePositionsWhichAreNotProcessedByUser(
          processedOffers
        );

      if (savedResumeUri) {
        const recommendedOffers = await getRecommendedJobs(
          savedResumeUri,
          availablePositions
        );

        reinitializeRecommendedOffers(recommendedOffers);
        setInitialRecommendedOffers(
          recommendedOffers.length ? recommendedOffers : [null]
        );
      } else {
        setInitialRecommendedOffers([null]);
      }
    })();
  }, [savedResumeUri, reinitializeRecommendedOffers, processedOffers]);

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

    // await sendEmail(emailFormData);
  };

  const acceptOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: async () => {
        addToAccepted(recommendedOffers[0]);
        await applyForPosition();
        await postAcceptedOfferId(recommendedOffers[0].id);
      },
    });
  };

  const rejectOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: async () => {
        addToRejected(recommendedOffers[0]);
        await postRejectedOfferId(recommendedOffers[0].id);
      },
    });
  };

  const saveOffer = () => {
    carouselRef?.current?.next({
      count: 1,
      animated: true,
      onFinished: async () => {
        addToSavedForFuture(recommendedOffers[0]);
        await postSavedOfferId(recommendedOffers[0].id);
      },
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
