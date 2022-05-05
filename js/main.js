'use static'

const bonusText = document.querySelectorAll(".bonus-calc--num");
const bonusRange = document.querySelector(".js-range-slider");
let activeImg = document.querySelectorAll(".range-img");
let inviteFriendQuantity = document.getElementById('invite-friend-qtty');
const bonusQuantity = document.getElementById("bonusQuantity");
let interactiveItems = document.querySelectorAll('.interactive-element');

let bonusSum = 0;
function animateValue(bonusQuantity, start, end, duration) {
    // let inProgress = 0
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        bonusQuantity.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
animateValue(bonusQuantity, 0, 2000, 500);



function sliderAdd(bonusRangeValue) {

    console.log('as')
    for (let i = 1; i <= bonusRangeValue; i++) {
        activeImg[i].classList.add("active");
        activeImg.forEach((element) => {
            element.style.transform = `scale(0.${100 - bonusRangeValue * 2})`;
        });
        animateValue(bonusQuantity, bonusSum, (2000 * (i + 1)), 1000);
        bonusSum = (2000 * (i + 1));
        inviteFriendQuantity.innerHTML = `${i + 1} друзей`
    }
}

function sliderRemove(bonusRangeValue) {
    for (let i = 7; i > bonusRangeValue; i--) {
        if (activeImg[i - 1].classList.contains("active")) {
            activeImg[i - 1].classList.remove("active");
        }
        animateValue(bonusQuantity, (2000 * (i + 1)), bonusSum, 1000);
        bonusSum = (2000 * (i - 1));
        inviteFriendQuantity.innerHTML = `${i} друзей`
    }
    // activeImg[i].style.transform = `scale(0)`;

}
let kostyl = 0
if(window.innerWidth > 900)  {
  let bonusBoxHeight = document.querySelectorAll('.bonus-box');
console.log(bonusBoxHeight[0].clientHeight)
bonusBoxHeight[1].style.height = bonusBoxHeight[0].clientHeight + 'px';
}

bonusRange.addEventListener("input", () => {
    if (kostyl <= bonusRange.value) {
        sliderAdd(parseInt(bonusRange.value));
        kostyl = bonusRange.value
    } else if (kostyl >= bonusRange.value) {
        sliderRemove(parseInt(bonusRange.value));
        kostyl = bonusRange.value
    }



    if (bonusRange.value >= "1") {
        activeImg[0].classList.add('active');
        // animateValue(obj, 0, 2000, 100);
        interactiveItems.forEach((e) => {
            e.style.height = '0px'
        })
    }
    if (bonusRange.value === "0") {
        // activeImg[0].style.transform = `scale(1.3)`;
        bonusText.innerHTML = `2 000`;
        
        inviteFriendQuantity.innerHTML = `1 друга`
        activeImg[0].classList.remove('active');
        // if (bonusQuantity.innerHTML !== "2000") {
            animateValue(bonusQuantity, 4000, 2000, 500);
        // }
        interactiveItems.forEach((e) => {
            e.style.height = 'auto'
        })
        console.log('123 - 321')
    }

    if(window.innerWidth < 900)  {
      if (bonusRange.value === "0") {
        activeImg[0].style.transform = 'scale(1.3)';
    }
    }
});