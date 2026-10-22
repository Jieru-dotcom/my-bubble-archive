// 基础信息配置
const bubbleConfig = {
    artistName: "백현이" // 在这里写你爱豆的名字
};

// 聊天数据库：后续月份内容直接往下追加即可！
const bubbleRawData = [
    // 范例 1：艺人发的一条纯文本消息（含韩文、中文翻译、对应去重后的原截图）
    {
        date: "2026-05-05",
        time: "08:09 AM",
        sender: "artist", // artist 代表艺人
        type: "text",
        textKo: "저를 제외하고 다른 사람들에게는 MBTI가 T로 바뀌고 아주 반짝이는 눈빛을 가지고 있습니다. 그리고 목소리가 크고요. 개인기가 거의 없습니다. 하지만 저를 위해 억지로라도 개인기를 만들죠. 노래를 잘 못하지만 저를 위해 노래도 불러주고요.. 미니언즈 옷, 상추핀을 착용할 줄 아는 자신감도 가지고 있는 사람이에요. 너무 사랑스럽죠? 
제가 더 많은 사랑을 주려고 하지만 제가 주는 사랑보다 이 사람한테 받는 사랑이 늘 커서 고민이에요. 
하지만 그 사랑받은 만큼 사랑을 다시 돌려주려고 하는 제 마음이, 저를 바라보는 그 눈빛이.. 
저를 지치지 않게 하고 더 열심히 살아가게 하는 것 같아요. 
저희의 관계는 서로에게 무한한 사랑을 알려준 소중한 인연이라 깨지지 않게 지키고 싶어요.

네, 저는 그 사람을 
보고 있어도 보고 싶을 만큼 사랑합니다.", 
        textZh: "哈哈哈哈 我爱你",
        mediaFile: "",
        srcScreenshot: "" // 对应的原始去重长截图文件名
    },

    // 范例 2：我给艺人的回复
    {
        date: "2026-10-01",
        time: "07:38 AM",
        sender: "me",     // me 代表我的回复
        type: "text",
        textKo: "나도 너무 사랑해❤️",
        textZh: "我也超级爱你❤️",
        mediaFile: "",
        srcScreenshot: "" 
    },

    // 范例 3：艺人发送的语音消息
    {
        date: "2026-10-01",
        time: "07:40 AM",
        sender: "artist",
        type: "audio", // 语音类型
        textKo: "[语音消息]",
        textZh: "",
        mediaFile: "voice_20261001.mp3", // 放在 media 文件夹下的语音文件名
        srcScreenshot: "screenshot_oct_01.png"
    },

    // 范例 4：艺人发送的图片
    {
        date: "2026-10-02",
        time: "09:00 PM",
        sender: "artist",
        type: "image", // 图片类型
        textKo: "[图片]",
        textZh: "",
        mediaFile: "baekhyun_photo.jpg", // 放在 media 文件夹下的图片名
        srcScreenshot: "screenshot_oct_02.png"
    }
    
    // 💡 以后新月份的聊天内容，你只需要在下面继续按这个格式复制粘贴，填入文字即可！
];
