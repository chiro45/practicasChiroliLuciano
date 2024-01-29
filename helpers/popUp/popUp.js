import { elementActive } from "../../main";

//===========POPUP===========
export const openPopUp = () => {
  document.getElementById("myModal").style.display = "flex";

  const buttonDelete = document.getElementById("deleterBtn");
  if (elementActive) {
    buttonDelete.style.display = "block";
  } else {
    buttonDelete.style.display = "none";
  }
};
export const closePopUP = () => {
  document.getElementById("myModal").style.display = "none";
};
