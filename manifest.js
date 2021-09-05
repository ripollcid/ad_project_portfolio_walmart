FT.manifest({
    "filename": "Main.html",
    "width": 300,
    "height": 250,
    "clickTagCount": 1,
    /*"feeds": [
        { 	"name": 			"walmartFeed",
            "url": 				"https://fdzcf.flashtalking.com/custom/walmart/FBI1095_rollbacks/rollbacks.php?zip=[%ftPostal%]&market=Nashville",
            "default_endpoint": 		"https://fdzcf.flashtalking.com/custom/walmart/FBI1095_rollbacks/rollbacks.php?zip=[%ftPostal%]&market=Nashville",
            "segment": 			""
        }
        ],*/
    "instantAds": [
        {"name": "walmartFeed", "type": "text"},
        {"name": "walmartFeed_default_endpoint", "type": "text"},
        {"name": "walmartFeed_segment", "type": "text"},
        {"name": "adConcept", "type": "text", "default": "A"},
        {"name": "backgroundColor", "type": "text", "default": "#007DC6"},
        {"name": "introFrame_rectangle_color", "type": "text", "default": "#FC0F36"},
        {
            "name": "introFrame_headline_text",
            "type": "text",
            "default": "<p style='color:#FFFFFF;'>Thousands <b style='color:#FDC13B;'>more</b><br>Rollbacks.<br><br><b style='color:#FDC13B;'>Here to stay</b><br>in [%CITY%].</p>"
        },
        {
            "name": "introFrame_headline_feedError_text",
            "type": "text",
            "default": "<p style='color:#FFFFFF;'>Thousands <b style='color:#FDC13B;'>more</b><br>Rollbacks.<br><br><b style='color:#FDC13B;'>Here to stay.</b></p>"
        },
        {"name": "introFrame_headline_text_size", "type": "text", "default": "24"},
        {"name": "introFrame_headline_text_lineHeight", "type": "text", "default": "24"},
        {"name": "introFrame_headline_text_xy", "type": "text", "default": "x:center|y:17"},
        {"name": "introFrame_person_image", "type": "image", "default": "person_introFrame_300x250.png"},
        {"name": "introFrame_person_image_xy", "type": "text", "default": "x:0|y:63"},
        {"name": "introFrame_logo_image", "type": "image", "default": "logo_introFrame_300x250.svg"},
        {"name": "introFrame_logo_image_xy", "type": "text", "default": "x:26|y:9"},
        {"name": "carouselFrame_headline_text_color", "type": "text", "default": "#FFFFFF"},
        {"name": "carouselFrame_headline_text_xy", "type": "text", "default": "x:16|y:12"},
        {"name": "logo_image", "type": "image", "default": "logo_300x250.svg"},
        {"name": "logo_image_xy", "type": "text", "default": "x:17|y:205"},
        {"name": "cta_background_color", "type": "text", "default": "#007DC6"},
        {"name": "cta_text", "type": "text", "default": "Find a Store"},
        {"name": "cta_text_color", "type": "text", "default": "#FFFFFF"},
        {"name": "cta_text_size", "type": "text", "default": "14"}
    ],
    "trackingEvents": [
        {"name": "product1_click", "type": "string"},
        {"name": "product2_click", "type": "string"},
        {"name": "product3_click", "type": "string"},
        {"name": "product4_click", "type": "string"},
        {"name": "product5_click", "type": "string"}
    ],
    "hideBrowsers": ["ie8"]
});
