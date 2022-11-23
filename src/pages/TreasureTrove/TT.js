import dataTT from './dataTT'
import dataSlider from "./dataTTSlider"
import close from '../../images/close.svg'

import leftArrow from "./icons/arrow-left.svg";
import rightArrow from "./icons/arrow-right.svg";

import "./TT.css"

function openModal(id, pindex){
    for(var i=0; i < dataTT.length; i++){
        if(dataTT[i].id === id){
            var sizeBoxContainer = document.getElementById("modal__size-container");
            var slideshowContainer = document.getElementById("modal__slideshow");
            
            slideshowContainer.innerHTML = "";
            sizeBoxContainer.innerHTML = "";

            var modal = document.getElementById("modal");

            let product = document.getElementById("modal__product");
            let price = document.getElementById("modal__price");
            let desc = document.getElementById("modal__desc");

            product.innerHTML = dataTT[i].name;
            price.innerHTML = dataTT[i].price;
            desc.innerHTML = dataTT[i].description;

            dataTT[i].sizes.map((obj) => {
                var sizeBoxContainer = document.getElementById("modal__size-container");
                let sizeBox = document.createElement("div");
                let size = document.createElement("p");

                size.innerHTML = obj.type; 
                size.id = "modal__size-text"
                sizeBox.appendChild(size);

                sizeBox.id = "modal__size-box";
                
                if(obj.quant >= 5){
                    sizeBox.className = "modal__size-box";
                } else if (obj.quant !== 0 && obj.quant < 5){
                    sizeBox.className = "modal__size-box low";

                    sizeBox.onmouseover = showNotice;
                    sizeBox.onmouseout = hideNotice;
                } else {
                    sizeBox.className = "modal__size-box oos";
                }
                
                sizeBoxContainer.appendChild(sizeBox);

                return(null)
            })

            dataSlider.map((obj, index) => {
                var slideshowContainer = document.getElementById("modal__slideshow");
                let slide = document.createElement("div");
                let slideImg = document.createElement("img");

                slide.className = index === 0 ? "modal__slide active-anim" : "modal__slide";
                slide.id = "modal__slide";

                slideImg.id = "modal__img";
                slideImg.alt = "product";
                slideImg.src = process.env.PUBLIC_URL + `/TT/product_${pindex + 1}/img_${index + 1}.png`;

                slide.appendChild(slideImg);
                slideshowContainer.appendChild(slide);

                return(null)
            })

            modal.showModal();
        }
    }
}

function closeModal(){
    var modal = document.getElementById("modal");
    modal.close();
}

function showNotice(){
    var notice = document.getElementById("modal__inventory-notice-box");
    notice.style.display = "block"
}

function hideNotice(){
    var notice = document.getElementById("modal__inventory-notice-box");
    notice.style.display = "none"
}

var slideIndex = 1

const nextSlide = () => {
    if(slideIndex !== dataSlider.length){
        slideIndex = slideIndex + 1
        showSlide(slideIndex);
    } 
    else if (slideIndex === dataSlider.length){
        slideIndex = 1
        showSlide(slideIndex) 
    }
}

const prevSlide = () => {
    if(slideIndex !== 1){
        slideIndex = slideIndex - 1
        showSlide(slideIndex);
    }
    else if (slideIndex === 1){
        slideIndex = dataSlider.length
        showSlide(slideIndex) 
    }
}

function showSlide(n){
    let slides = document.getElementsByClassName("modal__slide");
    console.log(n - 1)
    
    slides[n - 1].className = "modal__slide active-anim";
    for(var i=0; i < dataSlider.length; i++){
        if(i !== (n - 1)){
            slides[i].className = "modal__slide"
        }
    }
    
}

function TT(){
    return(
        <div className="container">
            <h2 className="tt-header">Fall/Winter 2022 Collection 🍂</h2>
            <div className="container product">
                <div className="product-grid">
                    {dataTT.map((obj, index) => {
                        return(
                            <div className="card stacked" key={obj.id}>
                                <img src={process.env.PUBLIC_URL + `/TT/product_${index + 1}/img_1.png`} alt="product img" className="card__img" onClick={function(){
                                    openModal(obj.id, index, slideIndex)
                                }}/>
                                <div className="card__content">
                                    <h3 className="card__title">{obj.name}</h3>
                                    <p className="card__price">{obj.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <dialog className="modal" id="modal">
                <div className="modal__container">
                    <div id="modal__slideshow">
                    </div>
                    <button onClick={nextSlide} className="modal__btn-slide next">
                        <img src={rightArrow} alt='slider nav button next'/>
                    </button>

                    <button onClick={prevSlide} className="modal__btn-slide prev">
                        <img src={leftArrow} alt='slider nav button prev'/>
                    </button>
                    <div className="modal__content">
                        <h2 id="modal__product">Test modal</h2>
                        <p id="modal__price">$999</p>
                        <p id="modal__desc">This is sample text that should be dynamically changed on click. If you see this text... then oops</p>

                        <div id="modal__inventory">
                            <h3 id="modal__inventory-header">Inventory (as of 11/22)</h3>
                            <div id="modal__size-container"></div>
                            <div id="modal__inventory-notice-box" className="modal__inventory-notice-box">
                                <p id="modal__inventory-notice" className="modal__inventory-notice">Notice: Less than 5 left in stock!</p>
                            </div>
                        </div>
                    </div>
                </div>
               
                <img id="modal__close" src={close} onClick={closeModal} alt="close modal"></img>
            </dialog>
        </div>
    );
}

export default TT;