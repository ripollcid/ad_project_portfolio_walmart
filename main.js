/*========================================================================*/
// VARS
/*========================================================================*/
// CONSTANTS
//------------------------------------------*/
var body = document.body;

//------------------------------------------*/
// IA AD OBJECTS
/*------------------------------------------*/
var ia_frameIntroText_xy_obj;
var ia_frameIntroPerson_xy_obj;
var ia_frameIntroLogo_xy_obj;
var ia_frameCarouselHeadlineText_xy_obj;
var ia_frameCarouselSubheadText_xy_obj;


//------------------------------------------*/
// AD ELEMENTS
/*------------------------------------------*/
var background_div = document.getElementById("background");
var frame_intro_div = document.getElementById("frame_intro");
var frame_intro_rectangle_div = document.getElementById("frame_intro_rectangle");
var frame_intro_text_div = document.getElementById("frame_intro_text");
var frame_intro_logo_div = document.getElementById("frame_intro_logo");
var frame_intro_smileyFaceTradeMark_div = document.getElementById("frame_intro_smileyFaceTradeMark");
var frame_intro_person_div = document.getElementById("frame_intro_person");
var frame_carousel_div = document.getElementById("frame_carousel");
var footer_div = document.getElementById("footer");
var footer_cta_div = document.getElementById("footer_cta");
var logo_div = document.getElementById("logo");
var border_div = document.getElementById("border");
var smileyFaceCarousel_container_div = document.getElementById("smileyFaceCarousel_container");
var hitArea_div = document.getElementById("hitArea");
var my_carousel;
var smileyFaceIntro_spriteSheet;
var smileyFaceCarousel_spriteSheet;

//------------------------------------------*/
// IMAGE PRELOADS
/*------------------------------------------*/
var symbols_img;
var dollars_img;
var cents_img;
var header_img;
var carousel_dotActive_img;
var carousel_dotInactive_img;

//------------------------------------------*/
// CAROUSEL DATA
/*------------------------------------------*/
var feed_arr = [
    {
        market: "Metuchen",
        name: "Perdue Ground Turkey, 93% lean - 7% Fat",
        url: "https://www.walmart.com/ip/Perdue-93-Lean-7-Fat-Ground-Turkey-40-oz/27147033",
        imageurl: "images/perdue_groundTurkey.png",
        waspricedollars: "5",
        waspricecents: "99",
        nowpricedollars: "4",
        nowpricecents: "01",
        soldby: ""
    },
    {
        market: "Metuchen",
        name: "Great Value Sugar Free French Vanilla Coffee Creamer, 10.2 oz",
        url: "https://www.walmart.com/ip/Great-Value-Sugar-Free-French-Vanilla-Coffee-Creamer-10.2-oz/17179173",
        imageurl: "images/greatValue_sugarFreeFrenchVanilla.png",
        waspricedollars: "3",
        waspricecents: "07",
        nowpricedollars: "2",
        nowpricecents: "28",
        soldby: ""
    },
    {
        market: "Metuchen",
        name: "Carnation Fat Free Evaporated Milk, 12 fl. oz. Can",
        url: "https://www.walmart.com/ip/Carnation-Vitamins-A-D-Added-Fat-Free-Evaporated-Milk-12-oz/10291885",
        imageurl: "images/carnation_evaporatedMilk.png",
        waspricedollars: "1",
        waspricecents: "38",
        nowpricedollars: "1",
        nowpricecents: "00",
        soldby: ""
    },
    {
        market: "Metuchen",
        name: "Great Value Chunk Chicken Breast, 5 oz",
        url: "https://www.walmart.com/ip/Great-Value-Chunk-Chicken-Breast-5-oz/36267274",
        imageurl: "images/greatValue_chunkChickenBreast.png",
        waspricedollars: "1",
        waspricecents: "18",
        nowpricedollars: "0",
        nowpricecents: "98",
        soldby: ""
    },
    /*{ 	market: "Metuchen",
        name: "Great Value Honey Graham Crackers, 3 Packs 14.4oz",
        url: "https://www.walmart.com/ip/Great-Value-Honey-Grahams-Crackers-3-Packs-14.4-Oz/10315952",
        imageurl: "images/products/greatValue_honeyGrahamCrackers.png",
        waspricedollars: "2",
        waspricecents: "18",
        nowpricedollars: "1",
        nowpricecents: "94",
        soldby: ""
    }*/
];
var price_obj;
var url_str = "";
var productName_str = "";
var autoScroll_interval;
var autoScrollCounter_num = 0;

//------------------------------------------*/
// PRELOAD VARIABLES
/*------------------------------------------*/
var isIALoaded_bool = false;
var isFeedSuccess_bool = false;
var isFeedError_bool = false;
var isCarouselLoaded_bool = false;
var isSmileyIntroSpriteLoaded_bool = false;
var isSmileyCarouselSpriteLoaded_bool = false;
var isMinIntroFrameDisplay_bool = false;

//------------------------------------------*/
// ANIMATION TIMER DATA
/*------------------------------------------*/
var minIntroDisplaySeconds_num = 3.5;
var introDisplaySeconds_timeout;

//------------------------------------------*/
// PRELOAD SET INTERVALS
/*------------------------------------------*/
var preloadIntroFrame_interval = setInterval(preloaderIntroFrame, 1);
var preloadCarouselFrame_interval;

/*------------------------------------------*/
// PRELOADERS
/*------------------------------------------*/
// INTRO FRAME
// This phase sakes sure our body, IA, and feed is loaded, then animates accordingly
function preloaderIntroFrame() {
    // if Feed is successful
    if (isIALoaded_bool && isFeedSuccess_bool && isSmileyIntroSpriteLoaded_bool) {
        // clears preloader interval once parent website is loaded
        clearInterval(preloadIntroFrame_interval);

        // Initiates animation for intro frame
        animationIntroFrame(0.5);

        // preload carousel frame
        preloadCarouselFrame_interval = setInterval(preloaderCarouselFrame, 1);
    }
    // Else if Feed load error
    else if (isIALoaded_bool && isFeedError_bool && isSmileyIntroSpriteLoaded_bool) {
        // clears preloader interval once parent website is loaded
        clearInterval(preloadIntroFrame_interval);

        // Initiates animation for intro frame with backup text contents.
        animationIntroFrame(0.5);
    }
}

// CAROUSEL FRAME
// This phase sakes sure our Carousel Frame assets are loaded, then animates accordingly
function preloaderCarouselFrame() {
    /*console.log("CAROUSEL: "+isCarouselLoaded_bool);
console.log("SMILEY: "+isSmileyCarouselSpriteLoaded_bool);
console.log("MINIMUM DISPLAY: "+isMinIntroFrameDisplay_bool);*/
    if (isCarouselLoaded_bool && isSmileyCarouselSpriteLoaded_bool && isMinIntroFrameDisplay_bool) {
        // clears preloader interval once parent website is loaded
        clearInterval(preloadCarouselFrame_interval);

        // Initiates animation for carousel frame
        animationCarouselFrame(0);
    }
}

/*------------------------------------------*/
// FEED
/*------------------------------------------*/
/*myFT.require(['feeds'], function(feeds){
	feeds.getFeed('walmartFeed', onFeedSuccess, onFeedError);
});*/

/*------------------------------------------*/
// TOUCH
/*------------------------------------------*/
myFT.require(['touch']);

/*------------------------------------------*/
// INSTANT AD EVENT LISTENER
/*------------------------------------------*/
// Instant Ad event listener
myFT.on('instantads', function () {
    frame_intro_div.onclick = function () {
        myFT.clickTag(1);
    }

    // Sets up combination IA variable
    ia_frameIntroText_xy_obj = AdUtils.createObject(myFT.instantAds.introFrame_headline_text_xy);
    ia_frameIntroPerson_xy_obj = AdUtils.createObject(myFT.instantAds.introFrame_person_image_xy);
    ia_frameIntroLogo_xy_obj = AdUtils.createObject(myFT.instantAds.introFrame_logo_image_xy);
    ia_logo_xy_obj = AdUtils.createObject(myFT.instantAds.logo_image_xy);
    ia_frameCarouselHeadlineText_xy_obj = AdUtils.createObject(myFT.instantAds.carouselFrame_headline_text_xy);

    // Here we setup our objects based on what's in the instant ads.
    background_div.style.backgroundColor = myFT.instantAds.backgroundColor;
    frame_intro_rectangle_div.style.backgroundColor = myFT.instantAds.introFrame_rectangle_color;
    frame_intro_text_div.style.fontSize = myFT.instantAds.introFrame_headline_text_size + "px";
    frame_intro_text_div.style.lineHeight = myFT.instantAds.introFrame_headline_text_lineHeight + "px";
    frame_intro_text_div.style.textAlign = (myFT.instantAds.adConcept.toLowerCase() == "a") ? "center" : "left";

    // logo
    logo_div.style.left = ia_logo_xy_obj.x + "px";
    logo_div.style.top = ia_logo_xy_obj.y + "px";

    // conditional handles x positioning of the frame_intro_text_div element
    if (ia_frameIntroText_xy_obj.x == "center") {
        // CSS properties horizontally centers frame_intro_text_div element inside of the frame_intro_div element
        frame_intro_text_div.style.left = 0;
        frame_intro_text_div.style.right = 0;
        frame_intro_text_div.style.marginLeft = "auto";
        frame_intro_text_div.style.marginRight = "auto";
    } else {
        // if text is not horizontally centered, div reverts to it's default value in the IA variable
        frame_intro_text_div.style.left = ia_frameIntroText_xy_obj.x + "px";
    }
    frame_intro_text_div.style.top = ia_frameIntroText_xy_obj.y + "px";

    // Loads in the intro logo and intro person images if the concept is concept "B" in the "adConcept" IA variable
    if (myFT.instantAds.adConcept.toLowerCase() == "b") {
        // intro logo image
        var frameIntro_logo_img = new Image();
        frameIntro_logo_img.src = myFT.instantAds.introFrame_logo_image;
        frame_intro_logo_div.appendChild(frameIntro_logo_img);
        frame_intro_logo_div.style.left = ia_frameIntroLogo_xy_obj.x + "px";
        frame_intro_logo_div.style.top = ia_frameIntroLogo_xy_obj.y + "px";

        // intro person image
        var frameIntro_person_img = new Image();
        frameIntro_person_img.src = myFT.instantAds.introFrame_person_image;
        frame_intro_person_div.appendChild(frameIntro_person_img);
        frame_intro_person_div.style.left = ia_frameIntroPerson_xy_obj.x + "px";
        frame_intro_person_div.style.top = ia_frameIntroPerson_xy_obj.y + "px";

        // logo
        logo_div.style.opacity = 0;
    }

    // CTA
    footer_cta_div.style.backgroundColor = myFT.instantAds.cta_background_color;
    footer_cta_div.style.color = myFT.instantAds.cta_text_color;
    footer_cta_div.style.fontSize = myFT.instantAds.cta_text_size + "px";

    // SMILEY INTRO SPRITESHEET
    // Instantiates Smiley Intro SpriteSheet
    smileyFaceIntro_spriteSheet = new SpriteSheet({
        src: "images/smileyIntro_spriteSheet.png",
        width: 300,
        height: 250,
        imageWidth: 300,
        imageHeight: 10250,
        priority: "row",
        totalFrames: 41,
        events: [{eventName: "onIntroPosition", frame: 16}],
        parent: frame_intro_div
    });
    smileyFaceIntro_spriteSheet.div.addEventListener("onIntroPosition", function () {
        smileyFaceIntro_spriteSheet.pause(0);
        // Smiley face trademark
        TweenMax.to(frame_intro_smileyFaceTradeMark_div, 0.35, {opacity: 1, delay: 0});
    });
    smileyFaceIntro_spriteSheet.div.addEventListener("spriteSheetLoaded", function () {
        smileyFaceIntro_spriteSheet.frame = 1;
        isSmileyIntroSpriteLoaded_bool = true;
    });

    // Hit Area
    hitArea_div.addEventListener("click", function () {
        // Modifies clickTag so that it can pass custom strings for tracking (ft_custom)
        // and then also executes clickTag
        // ------------------------------------
        // 1st parameter: clickTag number
        // 2nd parameter: clickTag dynamic url (if there's no dynamic url, you can leave it as "")
        // 3rd parameter: string you want to track
        AdUtils.clickTagModifier(1, url_str, productName_str);

        // standard product tracker
        myFT.tracker("product" + (my_carousel.currentItem + 1) + "_click", 0, "INTERACTION: product" + (my_carousel.currentItem + 1) + " clicked");
    });

    // Alignment of CTA text based on OS and browser combinations
    if (AdUtils.platformDetector.os() == "Mac/iOS") {
        switch (AdUtils.platformDetector.browser()) {
            case "Chrome":
                footer_cta_div.style.paddingTop = "3px";
                break;
            case "Firefox":
                footer_cta_div.style.paddingTop = "3px";
                break;
            case "Safari":
                footer_cta_div.style.paddingTop = "3px";
                break;
            case "Opera":
                footer_cta_div.style.paddingTop = "3px";
                break;
            default:
                footer_cta_div.style.paddingTop = "3px";
                break;
        }
    } else if (AdUtils.platformDetector.os() == "Windows 7") {
        switch (AdUtils.platformDetector.browser()) {
            case "Chrome":
                footer_cta_div.style.paddingTop = "3px";
                break;
            case "Firefox":
                footer_cta_div.style.paddingTop = "1px";
                break;
            case "IE 10":
                footer_cta_div.style.paddingTop = "4px";
                break;
            case "IE 11":
                footer_cta_div.style.paddingTop = "4px";
                break;
            case "Opera":
                footer_cta_div.style.paddingTop = "4px";
                break;
            default:
                footer_cta_div.style.paddingTop = "4px";
                break;
        }
    } else if (AdUtils.platformDetector.os() == "Windows 8" || AdUtils.platformDetector.os() == "Windows 8.1") {
        switch (AdUtils.platformDetector.browser()) {
            case "Chrome":
                footer_cta_div.style.paddingTop = "3px";
                break;
            case "Firefox":
                footer_cta_div.style.paddingTop = "1px";
                break;
            case "IE 10":
                footer_cta_div.style.paddingTop = "4px";
                break;
            case "IE 11":
                footer_cta_div.style.paddingTop = "4px";
                break;
            case "Opera":
                footer_cta_div.style.paddingTop = "4px";
                break;
            default:
                footer_cta_div.style.paddingTop = "4px";
                break;
        }
    } else {
        footer_cta_div.style.paddingTop = "3px";
    }

    // IA Preload boolean
    isIALoaded_bool = true;

    // FeedSuccess
    onFeedSuccess(feed_arr);
});

/*------------------------------------------*/
// FEED HANDLING
/*------------------------------------------*/
function onFeedSuccess(feedArray) {
    console.log(feedArray);
    // Try and catch used to handle all weird errors/data
    // that may come from the feed.
    try {
        // tracker
        Tracker.impressionTrackEvent("feed_success");

        // stores our feed array
        feed_arr = feedArray;
        //console.log(feedArray);

        frame_intro_text_div.innerHTML = AdUtils.findAndReplace({
            string: frame_intro_text_div.innerHTML,
            list: [{
                find: "[%CITY%]",
                replace: (feedArray[0].market.slice(feedArray[0].market.length - 1, feedArray[0].market.length) == " ") ? feedArray[0].market.slice(0, feedArray[0].market.length - 1) : feedArray[0].market
            }]
        });

        // Images that will be used multiple times.  Doing this so the unit will only load the images once
        // price header image
        header_img = new Image();
        header_img.src = "images/headerImage.svg";

        // carousel active dot image
        carousel_dotActive_img = new Image();
        carousel_dotActive_img.src = "images/dotActive_carouselFrame.svg";

        // carousel inactive dot image
        carousel_dotInactive_img = new Image();
        carousel_dotInactive_img.src = "images/dotInactive_carouselFrame.svg";

        // Instantiates carousel
        my_carousel = new Carousel({
            width: 300,
            height: 250,
            id: "carousel",
            feedArray: feed_arr,
            headerText: {
                fontSize: 16,
                left: ia_frameCarouselHeadlineText_xy_obj.x,
                top: ia_frameCarouselHeadlineText_xy_obj.y
            },
            productImage: {left: 140, top: 48, width: 140, height: 140},
            price: {left: 17, ease: Linear.easeNone, duration: 0.35, delay: 0.2, headerImageSrc: header_img},
            navigation: {
                leftArrowImage: {
                    src: "images/leftArrow_carouselFrame.svg",
                    left: -10,
                    top: 130
                },
                rightArrowImage: {
                    src: "images/rightArrow_carouselFrame.svg",
                    left: 270,
                    top: 130
                },
                activeDotImage: {
                    src: carousel_dotActive_img,
                },
                inactiveDotImage: {
                    src: carousel_dotInactive_img,
                },
            },
            parent: frame_carousel_div
        });
        my_carousel.div.addEventListener("carouselLoaded", function () {
            isCarouselLoaded_bool = true;
        });

        // Instantiates Smiley SpriteSheet
        smileyFaceCarousel_spriteSheet = new SpriteSheet({
            src: "images/smileyCarousel_spriteSheet.png",
            width: 300,
            height: 250,
            imageWidth: 300,
            imageHeight: 10750,
            priority: "row",
            totalFrames: 43,
            events: [{eventName: "onPriceHit", frame: 3}
            ],
            parent: smileyFaceCarousel_container_div
        });
        smileyFaceCarousel_spriteSheet.div.addEventListener("onPriceHit", function () {
            // Smiley should change the price when the event fires
            my_carousel["carouselPanel" + (my_carousel.currentItem + 1)]["carousel_price" + (my_carousel.currentItem + 1)].startTransition(0);
        });
        smileyFaceCarousel_spriteSheet.div.addEventListener("spriteSheetLoaded", function () {
            smileyFaceCarousel_spriteSheet.frame = 1;
            isSmileyCarouselSpriteLoaded_bool = true;
        });
        smileyFaceCarousel_spriteSheet.left = 0;
        smileyFaceCarousel_spriteSheet.top = 0;

        // tells unit that feed is processed
        isFeedSuccess_bool = true;
        console.log(isFeedSuccess_bool)
    } catch (err) {
        //feedFail();
    }
}


// Handles the ad if the feed throws an error.  Backup images from the IA variables are loaded
/*function onFeedError(error, extra_information){
	feedFail();
}

function feedFail(){
	// tracker
	Tracker.impressionTrackEvent("feed_error");

	// Sets default text in case of feed error
	frame_intro_text_div.innerHTML = myFT.instantAds.introFrame_headline_feedError_text;

	// tells unit that there's an error in our feed
	isFeedError_bool = true;
}*/

/*------------------------------------------*/
// ANIMATION FUNCTIONS
/*------------------------------------------*/

// Intro Frame animation
function animationIntroFrame(d) {
    // Sets a timer for animation frame.  If the minimum display seconds of the intro frame
    // has been met, then the carousel frame can animate in.
    introDisplaySeconds_timeout = setTimeout(function () {
        isMinIntroFrameDisplay_bool = true;
    }, minIntroDisplaySeconds_num * 1000);

    // Intro frame
    TweenMax.to(frame_intro_div, 0.35, {
        opacity: 1,
        delay: d + 0.5
    });

    smileyFaceIntro_spriteSheet.play({speed: 45, delay: d + 0.9});
}

// Carousel Frame animation
function animationCarouselFrame(d) {
    // Logo introFrame_logo_image_xy
    if (myFT.instantAds.adConcept.toLowerCase() == "b") {
        TweenMax.to(logo_div, 0.5, {opacity: 1, delay: d});
    }

    smileyFaceIntro_spriteSheet.play({speed: 45, delay: d});

    // Smiley face trademark
    TweenMax.to(frame_intro_smileyFaceTradeMark_div, 0.35, {opacity: 0, delay: d});

    // Intro frame
    TweenMax.to(frame_intro_div, 0.35, {
        opacity: 0,
        delay: d + 1.25,
        onComplete: function () {
            frame_intro_div.style.display = "none";
        },
    });

    // Carousel frame
    TweenMax.to(frame_carousel_div, 0.35, {
        opacity: 1,
        delay: d + 1.75,
        ease: Linear.easeNone,
        onComplete: (function (delay) {
            my_carousel.initiateFirstItemAnimation(d + 0.5);
            smileyFaceCarousel_spriteSheet.play({speed: 45, delay: d + 3});
            carouselAutoScroll(d + 1.5);
        })(d)
    });
}

// Carousel auto-scroller
function carouselAutoScroll(d) {
    setTimeout(function () {
        autoScroll_interval = setInterval(function () {
            my_carousel.next();

            autoScrollCounter_num++;
            if (autoScrollCounter_num >= feed_arr.length) {
                hitArea_div.addEventListener("swipeLeft", function () {
                    if (!my_carousel.isMotion) {
                        my_carousel.next();
                    }
                });

                hitArea_div.addEventListener("swipeRight", function () {
                    if (!my_carousel.isMotion) {
                        my_carousel.previous();
                    }
                });
                my_carousel.enableNavigation(0.5);
                clearInterval(autoScroll_interval);
            }
            if (autoScrollCounter_num < feed_arr.length) {
                // Smiley face image
                smileyFaceCarousel_spriteSheet.frame = 1;
                smileyFaceCarousel_spriteSheet.play({speed: 45, delay: 1.5});
            }
        }, 5500);
    }, d * 1000);
}
