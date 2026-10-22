// 基础信息配置
const bubbleConfig = {
    artistName: "边伯贤" // 在这里写你爱豆的名字
};

// 聊天数据库：后续月份内容直接往下追加即可！
const bubbleRawData = [
    // 范例 1：艺人发的一条纯文本消息（含韩文、中文翻译、对应去重后的原截图）
    {
        date: "2026-10-01",
        time: "07:37 AM",
        sender: "artist", // artist 代表艺人
        type: "text",
        textKo: "ㅋㅋㅋㅋ 사랑해", 
        textZh: "哈哈哈哈 我爱你",
        mediaFile: "",
        srcScreenshot: "screenshot_oct_01.png" // 对应的原始去重长截图文件名
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
