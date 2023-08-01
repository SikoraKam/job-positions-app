import { FC, Ref } from "react";
import { HomeScreen } from "./Home.screen";
import { useBoundStore } from "../../store/useBoundStore";
import { useRef } from "react/index";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { emailApplicationMessageConstructor } from "../../utils/emails";
import { sendEmail } from "../../services/api/emails.service";
import { getRecommendedJobs } from "../../services/api/offers.service";

export const Home: FC = () => {
  const recommendedOffers = useBoundStore((state) => state.recommendedOffers);
  const addToSavedForFuture = useBoundStore(
    (state) => state.addToSavedForFuture
  );
  const addToAccepted = useBoundStore((state) => state.addToAccepted);
  const addToRejected = useBoundStore((state) => state.addToRejected);
  const userData = useBoundStore((state) => state.userData);
  const savedResumeUri = useBoundStore((state) => state.savedResumeUri);

  const carouselRef: Ref<ICarouselInstance> = useRef(null);

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
    await getRecommendedJobs();
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
      {...{
        acceptOffer,
        rejectOffer,
        saveOffer,
        recommendedOffers,
        carouselRef,
      }}
    />
  );
};
