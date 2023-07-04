import { JobPositionDetails } from "../types/positions.types";

export const JobPositionMock: JobPositionDetails = {
  imageSource: "https://picsum.photos/400/200",
  companyName: "Nazwa Firmy",
  companyLogoImageSource: "https://picsum.photos/100",
  positionName: "Java Developer",
  location: "Kraków, Polska",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas orci mi, fringilla at accumsan ut, pharetra luctus elit. Praesent a purus sollicitudin, suscipit leo vitae, suscipit velit. Praesent condimentum vehicula semper. Etiam tempor nisi eu quam rhoncus aliquam. Nullam feugiat nec tortor at molestie. Morbi tempus ipsum ac lacinia accumsan. Duis bibendum pellentesque leo. Curabitur a eleifend mauris, feugiat rutrum eros. Praesent quis nisl tortor. Pellentesque imperdiet mauris a urna auctor, ut dapibus urna mollis. Vivamus eu augue at quam sodales vestibulum vitae egestas massa. Curabitur placerat non sem ac dapibus.",
  skills: ["Java", "Kubernetes", "Git", "HTML", "CSS", "React Native"],
  salary: "8000 - 10000 PLN",
  remote: true,
  responsibilities: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Maecenas orci mi, fringilla at accumsan ut, pharetra luctus elit.",
    "Praesent quis nisl tortor.",
    "Ut mollis elementum diam, imperdiet ullamcorper mauris sagittis sit amet.",
  ],
  requirements: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Maecenas orci mi, fringilla at accumsan ut, pharetra luctus elit.",
    "Praesent quis nisl tortor.",
    "Ut mollis elementum diam, imperdiet ullamcorper mauris sagittis sit amet.",
  ],
  additionalInfo:
    "Suspendisse potenti. Donec convallis arcu diam, vitae malesuada mi elementum vitae. Donec nibh tellus, tristique in ipsum eu, mollis pellentesque mauris. Maecenas a ullamcorper velit. In hac habitasse platea dictumst. Pellentesque ipsum mauris, euismod sed eros sit amet, lobortis gravida neque.",
  contactEmail: "example@company.pl",
  website: "https://google.com",
  benefits: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Maecenas orci mi, fringilla at accumsan ut, pharetra luctus elit.",
    "Praesent quis nisl tortor.",
    "Ut mollis elementum diam, imperdiet ullamcorper mauris sagittis sit amet.",
  ],
  partTime: false,
};
