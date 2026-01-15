import React, { useState } from 'react';
import { BookOpen, GraduationCap, CheckCircle, ChevronRight, Menu, X, Globe, MessageCircle, Star, Trophy, RefreshCcw, Calendar, Clock, Users, Hash, Watch, Layers } from 'lucide-react';

// --- 資料庫 (課程內容) ---
const lessonsData = [
  {
    id: 1,
    title: "第1課：自我介紹與基本句型",
    description: "學習如何自我介紹，以及「是」與「不是」的基本句型。",
    vocab: [
      { id: 1, kanji: "私", kana: "わたし", romaji: "watashi", meaning: "我" },
      { id: 2, kanji: "私たち", kana: "わたしたち", romaji: "watashitachi", meaning: "我們" },
      { id: 3, kanji: "あなた", kana: "あなた", romaji: "anata", meaning: "你" },
      { id: 4, kanji: "あの人", kana: "あのひと", romaji: "anohito", meaning: "那個人" },
      { id: 5, kanji: "あの方", kana: "あのかた", romaji: "anokata", meaning: "那一位 (禮貌形)" },
      { id: 6, kanji: "先生", kana: "せんせい", romaji: "sensei", meaning: "老師 (稱呼他人)" },
      { id: 7, kanji: "教師", kana: "きょうし", romaji: "kyoushi", meaning: "教師 (自稱職業)" },
      { id: 8, kanji: "学生", kana: "がくせい", romaji: "gakusei", meaning: "學生" },
      { id: 9, kanji: "会社員", kana: "かいしゃいん", romaji: "kaishain", meaning: "公司職員" },
      { id: 10, kanji: "社員", kana: "しゃいん", romaji: "shain", meaning: "～公司的職員" },
      { id: 11, kanji: "医者", kana: "いしゃ", romaji: "isha", meaning: "醫生" },
      { id: 12, kanji: "研究者", kana: "けんきゅうしゃ", romaji: "kenkyuusha", meaning: "研究人員" },
      { id: 13, kanji: "大学", kana: "だいがく", romaji: "daigaku", meaning: "大學" },
      { id: 14, kanji: "病院", kana: "びょういん", romaji: "byouin", meaning: "醫院" },
      { id: 15, kanji: "誰", kana: "だれ", romaji: "dare", meaning: "誰" },
      { id: 16, kanji: "～歳", kana: "～さい", romaji: "~sai", meaning: "～歲" },
      { id: 17, kanji: "何歳", kana: "なんさい", romaji: "nansai", meaning: "幾歲" },
      { id: 18, kanji: "はい", kana: "はい", romaji: "hai", meaning: "是 / 好的" },
      { id: 19, kanji: "いいえ", kana: "いいえ", romaji: "iie", meaning: "不 / 不是" },
    ],
    relatedVocab: [
      { id: 'r1', category: "國家・人", list: [
        { kanji: "アメリカ", kana: "アメリカ", meaning: "美國" },
        { kanji: "イギリス", kana: "イギリス", meaning: "英國" },
        { kanji: "インド", kana: "インド", meaning: "印度" },
        { kanji: "インドネシア", kana: "インドネシア", meaning: "印尼" },
        { kanji: "韓国", kana: "かんこく", meaning: "韓國" },
        { kanji: "タイ", kana: "タイ", meaning: "泰國" },
        { kanji: "中国", kana: "ちゅうごく", meaning: "中國" },
        { kanji: "ドイツ", kana: "ドイツ", meaning: "德國" },
        { kanji: "日本", kana: "にほん", meaning: "日本" },
        { kanji: "ブラジル", kana: "ブラジル", meaning: "巴西" },
      ]}
    ],
    grammar: [
      {
        id: 1,
        title: "Ｎ1 は Ｎ2 です",
        explanation: "這是日語最基本的肯定句。「は」(讀作 wa) 是助詞，提示主題。「です」表示斷定，相當於中文的「是」。",
        examples: [
          { jp: "私は学生です。", cn: "我是學生。" },
          { jp: "ミラーさんは会社員です。", cn: "米勒先生是公司職員。" },
          { jp: "サントスさんはブラジル人です。", cn: "山多斯先生是巴西人。" }
        ]
      },
      {
        id: 2,
        title: "Ｎ1 は Ｎ2 じゃありません",
        explanation: "這是「～です」的否定形，用於口語。正式場合可用「では ありません」。",
        examples: [
          { jp: "私は会社員じゃありません。", cn: "我不是公司職員。" },
          { jp: "サントスさんは学生じゃありません。", cn: "山多斯先生不是學生。" },
          { jp: "ワンさんは医者ではありません。", cn: "王先生不是醫生。(較正式)" }
        ]
      },
      {
        id: 3,
        title: "Ｎ1 は Ｎ2 ですか",
        explanation: "在句尾加上助詞「か」表示疑問。日語的問句通常不使用問號，而是用句號。",
        examples: [
          { jp: "あなたは学生ですか。", cn: "你是學生嗎？" },
          { jp: "ミラーさんはアメリカ人ですか。", cn: "米勒先生是美國人嗎？" },
          { jp: "あの方はどなたですか。", cn: "那位是哪位？" }
        ]
      },
      {
        id: 4,
        title: "Ｎも",
        explanation: "助詞「も」表示「也」的意思。取代原本的「は」。",
        examples: [
          { jp: "ミラーさんは会社員です。グプタさんも会社員です。", cn: "米勒先生是公司職員。古普塔先生也是公司職員。" },
          { jp: "私も学生じゃありません。", cn: "我也不是學生。" }
        ]
      }
    ],
    quiz: [
      {
        question: "請選擇正確的助詞：私 (  ) 先生です。",
        options: ["は", "が", "の", "を"],
        answer: "は"
      },
      {
        question: "翻譯：我不是老師。",
        options: ["私は先生です。", "私は先生じゃありません。", "私は先生ですか。", "私は先生ではありませんか。"],
        answer: "私は先生じゃありません。"
      },
      {
        question: "「請問您貴姓大名？」的日文是？",
        options: ["お名前は？", "お国は？", "おいくつ？", "失礼ですが？"],
        answer: "お名前は？"
      },
      {
        question: "翻譯：山田先生「也」是公司職員。",
        options: ["山田さんも会社員です。", "山田さんは会社員です。", "山田さんの会社員です。", "山田さんが会社員です。"],
        answer: "山田さんも会社員です。"
      },
      {
        question: "A: あなたは学生ですか。 B: はい、(  )。",
        options: ["学生じゃありません", "学生です", "そうですか", "あなたです"],
        answer: "学生です"
      },
      {
        question: "あの人 (  ) 木村さんです。",
        options: ["は", "の", "も", "か"],
        answer: "は"
      },
      {
        question: "ミラーさんは IMC (  ) 社員です。",
        options: ["の", "は", "も", "が"],
        answer: "の"
      },
      {
        question: "あの方 は (  ) ですか。",
        options: ["どなた", "だれ", "なん", "どこ"],
        answer: "どなた"
      },
      {
        question: "初次見面時的寒暄語是？",
        options: ["はじめまして", "こんにちは", "こんばんは", "さようなら"],
        answer: "はじめまして"
      }
    ]
  },
  {
    id: 2,
    title: "第2課：指示代名詞 (こそあど)",
    description: "學習如何指稱事物：這、那、那個。",
    vocab: [
      { id: 1, kanji: "これ", kana: "これ", romaji: "kore", meaning: "這 (近稱)" },
      { id: 2, kanji: "それ", kana: "それ", romaji: "sore", meaning: "那 (中稱)" },
      { id: 3, kanji: "あれ", kana: "あれ", romaji: "are", meaning: "那個 (遠稱)" },
      { id: 4, kanji: "この～", kana: "この～", romaji: "kono~", meaning: "這～ (連體詞)" },
      { id: 5, kanji: "本", kana: "ほん", romaji: "hon", meaning: "書" },
      { id: 6, kanji: "辞書", kana: "じしょ", romaji: "jisho", meaning: "字典" },
      { id: 7, kanji: "雑誌", kana: "ざっし", romaji: "zasshi", meaning: "雜誌" },
      { id: 8, kanji: "新聞", kana: "しんぶん", romaji: "shinbun", meaning: "報紙" },
      { id: 9, kanji: "手帳", kana: "てちょう", romaji: "techou", meaning: "記事本" },
      { id: 10, kanji: "名刺", kana: "めいし", romaji: "meishi", meaning: "名片" },
      { id: 11, kanji: "鉛筆", kana: "えんぴつ", romaji: "enpitsu", meaning: "鉛筆" },
      { id: 12, kanji: "時計", kana: "とけい", romaji: "tokei", meaning: "鐘錶" },
      { id: 13, kanji: "傘", kana: "かさ", romaji: "kasa", meaning: "傘" },
      { id: 14, kanji: "鞄", kana: "かばん", romaji: "kaban", meaning: "皮包" },
      { id: 15, kanji: "車", kana: "くるま", romaji: "kuruma", meaning: "車子" },
      { id: 16, kanji: "机", kana: "つくえ", romaji: "tsukue", meaning: "桌子" },
      { id: 17, kanji: "椅子", kana: "いす", romaji: "isu", meaning: "椅子" },
      { id: 18, kanji: "英語", kana: "えいご", romaji: "eigo", meaning: "英語" },
      { id: 19, kanji: "何", kana: "なん", romaji: "nan", meaning: "什麼" },
    ],
    relatedVocab: [
      { id: 'r1', category: "身邊的小物", list: [
        { kanji: "カセットテープ", kana: "カセットテープ", meaning: "錄音帶 (經典詞彙)" },
        { kanji: "テープレコーダー", kana: "テープレコーダー", meaning: "錄音機" },
        { kanji: "テレビ", kana: "テレビ", meaning: "電視" },
        { kanji: "ラジオ", kana: "ラジオ", meaning: "收音機" },
        { kanji: "カメラ", kana: "カメラ", meaning: "相機" },
        { kanji: "コンピューター", kana: "コンピューター", meaning: "電腦" },
        { kanji: "チョコレート", kana: "チョコレート", meaning: "巧克力" },
        { kanji: "コーヒー", kana: "コーヒー", meaning: "咖啡" },
      ]}
    ],
    grammar: [
      {
        id: 1,
        title: "これ / それ / あれ は Ｎ です",
        explanation: "指示代名詞當主詞使用。これ(近)、それ(中)、あれ(遠)。",
        examples: [
          { jp: "これは辞書です。", cn: "這是字典。" },
          { jp: "それは私の傘です。", cn: "那把是我的傘。" },
          { jp: "あれは誰の鞄ですか。", cn: "那個是誰的皮包？" }
        ]
      },
      {
        id: 2,
        title: "この / その / あの Ｎ は ～ です",
        explanation: "這些詞是「連體詞」，不能單獨使用，後面必須接名詞。",
        examples: [
          { jp: "この本は私のです。", cn: "這本書是我的。" },
          { jp: "その方はどなたですか。", cn: "那位是哪位？" },
          { jp: "あの方も会社員ですか。", cn: "那位也是公司職員嗎？" }
        ]
      },
      {
        id: 3,
        title: "そうです / そうじゃありません",
        explanation: "回答名詞句的疑問句時，肯定用「はい、そうです」，否定用「いいえ、そうじゃありません」或「いいえ、ちがいます」。",
        examples: [
          { jp: "A: それは辞書ですか。 B: はい、そうです。", cn: "A: 那是字典嗎？ B: 是的，沒錯。" },
          { jp: "A: それは手帳ですか。 B: いいえ、ちがいます。", cn: "A: 那是記事本嗎？ B: 不，不是。" }
        ]
      },
      {
        id: 4,
        title: "N1 の N2",
        explanation: "表示所屬（誰的）、內容（什麼的）等關係。",
        examples: [
          { jp: "これはコンピューターの本です。", cn: "這是電腦相關的書。（內容）" },
          { jp: "これは私の本です。", cn: "這是我的書。（所有者）" }
        ]
      }
    ],
    quiz: [
      {
        question: "填空： (  ) ほんは私のです。",
        options: ["これ", "この", "ここ", "こちら"],
        answer: "この"
      },
      {
        question: "A: あれは鉛筆ですか。 B: いいえ、(  )。",
        options: ["そうです", "ちがいます", "鉛筆です", "ペンです"],
        answer: "ちがいます"
      },
      {
        question: "「雜誌」的日文讀音是？",
        options: ["ざっし", "じしょ", "しんぶん", "てちょう"],
        answer: "ざっし"
      },
      {
        question: "これ (  ) 辞書ですか。",
        options: ["は", "の", "も", "か"],
        answer: "は"
      },
      {
        question: "A: それはなんですか。 B: (  ) は名刺です。",
        options: ["これ", "それ", "あれ", "どれ"],
        answer: "これ"
      },
      {
        question: "這是誰的雨傘？",
        options: ["これは誰の傘ですか。", "これは何の傘ですか。", "これは誰ですか。", "これは傘ですか。"],
        answer: "これは誰の傘ですか。"
      },
      {
        question: "この傘は (  ) です。",
        options: ["私", "私の", "私は", "私を"],
        answer: "私の"
      },
      {
        question: "「車」的日文讀音是？",
        options: ["くるま", "じてんしゃ", "でんしゃ", "つくえ"],
        answer: "くるま"
      },
      {
        question: "翻譯：不，那不是我的。",
        options: ["いいえ、それは私のです。", "いいえ、それは私のじゃありません。", "はい、それは私のです。", "いいえ、これは私のじゃありません。"],
        answer: "いいえ、それは私のじゃありません。"
      }
    ]
  },
  {
    id: 3,
    title: "第3課：場所與位置",
    description: "學習如何表達地點、位置以及價格。",
    vocab: [
      { id: 1, kanji: "ここ", kana: "ここ", romaji: "koko", meaning: "這裡" },
      { id: 2, kanji: "そこ", kana: "そこ", romaji: "soko", meaning: "那裡" },
      { id: 3, kanji: "あそこ", kana: "あそこ", romaji: "asoko", meaning: "那裡 (遠處)" },
      { id: 4, kanji: "どこ", kana: "どこ", romaji: "doko", meaning: "哪裡" },
      { id: 5, kanji: "こちら", kana: "こちら", romaji: "kochira", meaning: "這邊 (禮貌形)" },
      { id: 6, kanji: "教室", kana: "きょうしつ", romaji: "kyoushitsu", meaning: "教室" },
      { id: 7, kanji: "食堂", kana: "しょくどう", romaji: "shokudou", meaning: "餐廳" },
      { id: 8, kanji: "事務所", kana: "じむしょ", romaji: "jimusho", meaning: "辦公室" },
      { id: 9, kanji: "会議室", kana: "かいぎしつ", romaji: "kaigishitsu", meaning: "會議室" },
      { id: 10, kanji: "受付", kana: "うけつけ", romaji: "uketsuke", meaning: "櫃檯" },
      { id: 11, kanji: "部屋", kana: "へや", romaji: "heya", meaning: "房間" },
      { id: 12, kanji: "トイレ", kana: "トイレ", romaji: "toire", meaning: "廁所" },
      { id: 13, kanji: "階段", kana: "かいだん", romaji: "kaidan", meaning: "樓梯" },
      { id: 14, kanji: "エレベーター", kana: "エレベーター", romaji: "erebe-ta-", meaning: "電梯" },
      { id: 15, kanji: "国", kana: "くに", romaji: "kuni", meaning: "國家" },
      { id: 16, kanji: "会社", kana: "かいしゃ", romaji: "kaisha", meaning: "公司" },
      { id: 17, kanji: "いくら", kana: "いくら", romaji: "ikura", meaning: "多少錢" },
    ],
    relatedVocab: [
      { id: 'r1', category: "百貨公司與樓層", list: [
        { kanji: "売り場", kana: "うりば", meaning: "賣場 / 櫃位" },
        { kanji: "屋上", kana: "おくじょう", meaning: "屋頂" },
        { kanji: "地下", kana: "ちか", meaning: "地下" },
        { kanji: "１階", kana: "いっかい", meaning: "一樓" },
        { kanji: "２階", kana: "にかい", meaning: "二樓" },
        { kanji: "３階", kana: "さんがい", meaning: "三樓 (注意發音)" },
        { kanji: "４階", kana: "よんかい", meaning: "四樓" },
        { kanji: "何階", kana: "なんがい", meaning: "幾樓 (注意發音)" },
      ]}
    ],
    grammar: [
      {
        id: 1,
        title: "ここ / そこ / あそこ は Ｎ です",
        explanation: "指示場所的代名詞。這是指示場所的用法。",
        examples: [
          { jp: "ここは教室です。", cn: "這裡是教室。" },
          { jp: "そこは受付ですか。", cn: "那裡是櫃檯嗎？" },
          { jp: "あそこはトイレです。", cn: "那裡是廁所。" }
        ]
      },
      {
        id: 2,
        title: "Ｎ は 場所 です",
        explanation: "說明人或物體的所在地。",
        examples: [
          { jp: "トイレはあそこです。", cn: "廁所在那裡。" },
          { jp: "電話はどこですか。", cn: "電話在哪裡？" },
          { jp: "ミラーさんは事務所です。", cn: "米勒先生在辦公室。" }
        ]
      },
      {
        id: 3,
        title: "Ｎ の Ｎ (產地/製造商)",
        explanation: "名詞1若是國家或公司名，表示產地或品牌。",
        examples: [
          { jp: "これは日本の車です。", cn: "這是日本的車。" },
          { jp: "これはソニーのテレビです。", cn: "這是Sony的電視。" }
        ]
      }
    ],
    quiz: [
      {
        question: "想問「電話在哪裡」時，正確說法是？",
        options: ["電話はどこですか。", "電話はだれですか。", "電話はなんですか。", "電話はどれですか。"],
        answer: "電話はどこですか。"
      },
      {
        question: "填空：食堂は (  ) です。(指遠處)",
        options: ["ここ", "そこ", "あそこ", "どこ"],
        answer: "あそこ"
      },
      {
        question: "「三樓」的日文讀音是？",
        options: ["さんかい", "さんがい", "みっかい", "みっがい"],
        answer: "さんがい"
      },
      {
        question: "事務所は (  ) ですか。",
        options: ["どちら", "だれ", "どれ", "なん"],
        answer: "どちら"
      },
      {
        question: "翻譯：這裡是食堂。",
        options: ["ここは食堂です。", "食堂はここです。", "あそこは食堂です。", "これは食堂です。"],
        answer: "ここは食堂です。"
      },
      {
        question: "A: そのワインは (  ) のですか。 B: フランスのです。",
        options: ["どこ", "だれ", "なん", "いくら"],
        answer: "どこ"
      },
      {
        question: "這條領帶多少錢？",
        options: ["このネクタイはいくらですか。", "そのネクタイはいくらですか。", "あのネクタイはいくらですか。", "どのネクタイはいくらですか。"],
        answer: "このネクタイはいくらですか。"
      },
      {
        question: "「地下」的日文讀音是？",
        options: ["ちか", "ちした", "じげ", "じか"],
        answer: "ちか"
      },
      {
        question: "エレベーターは (  ) です。",
        options: ["あちら", "あれ", "あの", "あそこへ"],
        answer: "あちら"
      }
    ]
  },
  {
    id: 4,
    title: "第4課：時間與動詞",
    description: "學習表達時間，以及動詞的現在、過去、肯定與否定形。",
    vocab: [
      { id: 1, kanji: "起きます", kana: "おきます", romaji: "okimasu", meaning: "起床" },
      { id: 2, kanji: "寝ます", kana: "ねます", romaji: "nemasu", meaning: "睡覺" },
      { id: 3, kanji: "働きます", kana: "はたらきます", romaji: "hatarakimasu", meaning: "工作" },
      { id: 4, kanji: "休みます", kana: "やすみます", romaji: "yasumimasu", meaning: "休息" },
      { id: 5, kanji: "勉強します", kana: "べんきょうします", romaji: "benkyoushimasu", meaning: "唸書/學習" },
      { id: 6, kanji: "終わります", kana: "おわります", romaji: "owarimasu", meaning: "結束" },
      { id: 7, kanji: "デパート", kana: "デパート", romaji: "depa-to", meaning: "百貨公司" },
      { id: 8, kanji: "銀行", kana: "ぎんこう", romaji: "ginkou", meaning: "銀行" },
      { id: 9, kanji: "郵便局", kana: "ゆうびんきょく", romaji: "yuubinkyoku", meaning: "郵局" },
      { id: 10, kanji: "図書館", kana: "としょかん", romaji: "toshokan", meaning: "圖書館" },
      { id: 11, kanji: "今", kana: "いま", romaji: "ima", meaning: "現在" },
      { id: 12, kanji: "～時", kana: "～じ", romaji: "~ji", meaning: "～點" },
      { id: 13, kanji: "～分", kana: "～ふん/ぷん", romaji: "~fun/pun", meaning: "～分" },
      { id: 14, kanji: "昨日", kana: "きのう", romaji: "kinou", meaning: "昨天" },
      { id: 15, kanji: "今日", kana: "きょう", romaji: "kyou", meaning: "今天" },
      { id: 16, kanji: "明日", kana: "あした", romaji: "ashita", meaning: "明天" },
    ],
    relatedVocab: [
      { id: 'r1', category: "動詞・時間關聯", list: [
        { kanji: "試験", kana: "しけん", meaning: "考試" },
        { kanji: "会議", kana: "かいぎ", meaning: "會議" },
        { kanji: "映画", kana: "えいが", meaning: "電影" },
        { kanji: "毎朝", kana: "まいあさ", meaning: "每天早上" },
        { kanji: "毎晩", kana: "まいばん", meaning: "每天晚上" },
        { kanji: "毎日", kana: "まいにち", meaning: "每天" },
        { kanji: "大変ですね", kana: "たいへんですね", meaning: "真是辛苦呢 (表示同情)" },
      ]}
    ],
    grammar: [
      {
        id: 1,
        title: "今 ～時～分 です",
        explanation: "詢問或回答現在的時間。",
        examples: [
          { jp: "今 4時5分です。", cn: "現在是4點5分。" },
          { jp: "今 9時半です。", cn: "現在是9點半。" },
          { jp: "ロンドンは今 何時ですか。", cn: "倫敦現在幾點？" }
        ]
      },
      {
        id: 2,
        title: "Vます / Vません / Vました / Vませんでした",
        explanation: "動詞的時態變化：現在肯定(ます)、現在否定(ません)、過去肯定(ました)、過去否定(ませんでした)。",
        examples: [
          { jp: "私は毎日勉強します。", cn: "我每天唸書。" },
          { jp: "私は明日働きません。", cn: "我明天不工作。" },
          { jp: "私は昨日勉強しました。", cn: "我昨天唸書了。" },
          { jp: "私は昨日働きませんでした。", cn: "我昨天沒工作。" }
        ]
      },
      {
        id: 3,
        title: "N(時間) に V",
        explanation: "在特定的時間點做某動作，時間名詞後加助詞「に」。",
        examples: [
          { jp: "私は6時に起きます。", cn: "我6點起床。" },
          { jp: "7月2日に日本へ行きます。", cn: "7月2日去日本。" }
        ]
      }
    ],
    quiz: [
      {
        question: "選擇正確助詞：毎朝 6時 (  ) 起きます。",
        options: ["に", "は", "を", "で"],
        answer: "に"
      },
      {
        question: "將「勉強します」改為過去否定形：",
        options: ["勉強しません", "勉強しました", "勉強しませんでした", "勉強しましょう"],
        answer: "勉強しませんでした"
      },
      {
        question: "翻譯：昨天10點睡覺。",
        options: ["明日10時に寝ます。", "昨日10時に寝ます。", "昨日10時に寝ました。", "昨日10時を寝ました。"],
        answer: "昨日10時に寝ました。"
      },
      {
        question: "今 4時 (  ) です。",
        options: ["半", "半分", "中", "間"],
        answer: "半"
      },
      {
        question: "昼12時 (  ) 1時まで 休みます。",
        options: ["から", "まで", "へ", "に"],
        answer: "から"
      },
      {
        question: "「後天」的日文是？",
        options: ["あさって", "あした", "おととい", "きのう"],
        answer: "あさって"
      },
      {
        question: "昨日 勉強 (  ) か。",
        options: ["しました", "します", "しません", "しましょう"],
        answer: "しました"
      },
      {
        question: "郵便局は何時 (  ) 何時までですか。",
        options: ["から", "まで", "に", "へ"],
        answer: "から"
      },
      {
        question: "毎朝 (  ) 起きますか。",
        options: ["何時", "何分", "何", "いつ"],
        answer: "何時"
      }
    ]
  },
  {
    id: 5,
    title: "第5課：移動與交通工具",
    description: "學習「去、來、回」的移動動詞，以及交通工具的用法。",
    vocab: [
      { id: 1, kanji: "行きます", kana: "いきます", romaji: "ikimasu", meaning: "去" },
      { id: 2, kanji: "来ます", kana: "きます", romaji: "kimasu", meaning: "來" },
      { id: 3, kanji: "帰ります", kana: "かえります", romaji: "kaerimasu", meaning: "回家/回去" },
      { id: 4, kanji: "学校", kana: "がっこう", romaji: "gakkou", meaning: "學校" },
      { id: 5, kanji: "スーパー", kana: "スーパー", romaji: "su-pa-", meaning: "超市" },
      { id: 6, kanji: "駅", kana: "えき", romaji: "eki", meaning: "車站" },
      { id: 7, kanji: "飛行機", kana: "ひこうき", romaji: "hikouki", meaning: "飛機" },
      { id: 8, kanji: "船", kana: "ふね", romaji: "fune", meaning: "船" },
      { id: 9, kanji: "電車", kana: "でんしゃ", romaji: "densha", meaning: "電車" },
      { id: 10, kanji: "地下鉄", kana: "ちかてつ", romaji: "chikatetsu", meaning: "地下鐵" },
      { id: 11, kanji: "新幹線", kana: "しんかんせん", romaji: "shinkansen", meaning: "新幹線" },
      { id: 12, kanji: "バス", kana: "バス", romaji: "basu", meaning: "公車" },
      { id: 13, kanji: "タクシー", kana: "タクシー", romaji: "takushi-", meaning: "計程車" },
      { id: 14, kanji: "歩いて", kana: "あるいて", romaji: "aruite", meaning: "步行" },
      { id: 15, kanji: "友達", kana: "ともだち", romaji: "tomodachi", meaning: "朋友" },
    ],
    relatedVocab: [
      { id: 'r1', category: "日子與節日", list: [
        { kanji: "祝日", kana: "しゅくじつ", meaning: "節日 / 國定假日" },
        { kanji: "誕生日", kana: "たんじょうび", meaning: "生日" },
        { kanji: "ゴールデンウィーク", kana: "ゴールデンウィーク", meaning: "黃金週 (GW)" },
        { kanji: "クリスマス", kana: "クリスマス", meaning: "聖誕節" },
        { kanji: "お正月", kana: "おしょうがつ", meaning: "新年" },
        { kanji: "先週", kana: "せんしゅう", meaning: "上週" },
        { kanji: "今週", kana: "こんしゅう", meaning: "本週" },
        { kanji: "来週", kana: "らいしゅう", meaning: "下週" },
      ]}
    ],
    grammar: [
      {
        id: 1,
        title: "N(場所) へ 行きます/来ます/帰ります",
        explanation: "表示移動的方向，助詞「へ」讀作「e」。",
        examples: [
          { jp: "京都へ行きます。", cn: "去京都。" },
          { jp: "日本へ来ました。", cn: "來了日本。" },
          { jp: "うちへ帰ります。", cn: "回家。" },
          { jp: "どこへも行きません。", cn: "哪裡都不去。(全面否定)" }
        ]
      },
      {
        id: 2,
        title: "N(交通工具) で 行きます/来ます/帰ります",
        explanation: "表示移動的手段/方法，助詞用「で」。但「走路」用「歩いて」不用助詞「で」。",
        examples: [
          { jp: "電車で行きます。", cn: "搭電車去。" },
          { jp: "タクシーで来ました。", cn: "搭計程車來的。" },
          { jp: "駅から歩いて帰りました。", cn: "從車站走路回家的。" }
        ]
      },
      {
        id: 3,
        title: "N(人/動物) と V",
        explanation: "表示動作的共同執行者（和誰一起），助詞用「と」。",
        examples: [
          { jp: "家族と日本へ来ました。", cn: "和家人來了日本。" },
          { jp: "一人で行きます。", cn: "一個人去。(一人で 不加 と)" }
        ]
      }
    ],
    quiz: [
      {
        question: "選擇正確助詞：会社 (  ) 行きます。",
        options: ["を", "へ", "で", "と"],
        answer: "へ"
      },
      {
        question: "選擇正確助詞：バス (  ) 帰ります。",
        options: ["で", "に", "へ", "を"],
        answer: "で"
      },
      {
        question: "翻譯：一個人去。",
        options: ["一人と行きます", "一人で行きます", "一人へ行きます", "一人に行きます"],
        answer: "一人で行きます"
      },
      {
        question: "昨日 どこ (  ) 行きませんでした。",
        options: ["へも", "へ", "に", "でも"],
        answer: "へも"
      },
      {
        question: "誰 (  ) 日本へ来ましたか。",
        options: ["と", "で", "へ", "を"],
        answer: "と"
      },
      {
        question: "A: いつ 日本へ来ましたか。 B: 3月25日 (  ) 来ました。",
        options: ["に", "で", "へ", "を"],
        answer: "に"
      },
      {
        question: "步行回家的日文是？",
        options: ["歩いて帰ります", "歩くで帰ります", "歩いてで帰ります", "散歩します"],
        answer: "歩いて帰ります"
      },
      {
        question: "「下週」的日文是？",
        options: ["来週", "今週", "先週", "毎週"],
        answer: "来週"
      },
      {
        question: "「飛機」的日文讀音是？",
        options: ["ひこうき", "ひこき", "しんかんせん", "ちかてつ"],
        answer: "ひこうき"
      }
    ]
  },
  {
    id: 6,
    title: "第6課：他動詞與邀約",
    description: "學習「吃、喝、看」等動作對象的表達，以及邀約他人做某事。",
    vocab: [
      { id: 1, kanji: "食べます", kana: "たべます", romaji: "tabemasu", meaning: "吃" },
      { id: 2, kanji: "飲みます", kana: "のみます", romaji: "nomimasu", meaning: "喝" },
      { id: 3, kanji: "吸います", kana: "すいます", romaji: "suimasu", meaning: "吸 (菸)" },
      { id: 4, kanji: "見ます", kana: "みます", romaji: "mimasu", meaning: "看" },
      { id: 5, kanji: "読みます", kana: "よみます", romaji: "yomimasu", meaning: "閱讀" },
      { id: 6, kanji: "買います", kana: "かいます", romaji: "kaimasu", meaning: "買" },
      { id: 7, kanji: "撮ります", kana: "とります", romaji: "torimasu", meaning: "拍 (照)" },
      { id: 8, kanji: "会います", kana: "あいます", romaji: "aimasu", meaning: "見面" },
      { id: 9, kanji: "ご飯", kana: "ごはん", romaji: "gohan", meaning: "飯 / 餐點" },
      { id: 10, kanji: "パン", kana: "パン", romaji: "pan", meaning: "麵包" },
      { id: 11, kanji: "水", kana: "みず", romaji: "mizu", meaning: "水" },
      { id: 12, kanji: "写真", kana: "しゃしん", romaji: "shashin", meaning: "照片" },
    ],
    relatedVocab: [
      { id: 'r1', category: "食物與菜單 (Menu)", list: [
        { kanji: "朝ごはん", kana: "あさごはん", meaning: "早餐" },
        { kanji: "昼ごはん", kana: "ひるごはん", meaning: "午餐" },
        { kanji: "晩ごはん", kana: "ばんごはん", meaning: "晚餐" },
        { kanji: "卵", kana: "たまご", meaning: "蛋" },
        { kanji: "肉", kana: "にく", meaning: "肉" },
        { kanji: "魚", kana: "さかな", meaning: "魚" },
        { kanji: "野菜", kana: "やさい", meaning: "蔬菜" },
        { kanji: "果物", kana: "くだもの", meaning: "水果" },
        { kanji: "牛乳", kana: "ぎゅうにゅう", meaning: "牛奶" },
        { kanji: "お茶", kana: "おちゃ", meaning: "茶 / 日本茶" },
        { kanji: "お酒", kana: "おさけ", meaning: "酒" },
      ]}
    ],
    grammar: [
      {
        id: 1,
        title: "N を V(他動詞)",
        explanation: "表示動作的對象（受詞），助詞用「を」(讀作 o)。",
        examples: [
          { jp: "ジュースを飲みます。", cn: "喝果汁。" },
          { jp: "魚を食べます。", cn: "吃魚。" },
          { jp: "本を読みます。", cn: "看書。" }
        ]
      },
      {
        id: 2,
        title: "N(場所) で V",
        explanation: "表示動作進行的場所，助詞用「で」。注意與存在的場所「に」區分。",
        examples: [
          { jp: "図書館で本を読みます。", cn: "在圖書館看書。" },
          { jp: "駅で新聞を買います。", cn: "在車站買報紙。" }
        ]
      },
      {
        id: 3,
        title: "Vませんか (邀約)",
        explanation: "禮貌地勸誘或邀約聽話者。比「Vましょう」更客氣，給予對方拒絕的餘地。",
        examples: [
          { jp: "一緒に京都へ行きませんか。", cn: "要不要一起去京都？" },
          { jp: "日曜日に映画を見ませんか。", cn: "星期天要不要看電影？" }
        ]
      },
      {
        id: 4,
        title: "Vましょう (提議)",
        explanation: "積極地提議做某事，或者答應對方的邀約時使用。",
        examples: [
          { jp: "ちょっと休みましょう。", cn: "稍微休息一下吧。" },
          { jp: "A: 一緒に食べませんか。 B: ええ、食べましょう。", cn: "A: 要不要一起吃？ B: 好啊，一起吃吧。" }
        ]
      }
    ],
    quiz: [
      {
        question: "選擇正確助詞：水 (  ) 飲みます。",
        options: ["を", "で", "に", "が"],
        answer: "を"
      },
      {
        question: "選擇正確助詞：デパート (  ) 靴を買いました。(動作場所)",
        options: ["に", "で", "へ", "を"],
        answer: "で"
      },
      {
        question: "翻譯：要不要一起去？",
        options: ["一緒に 行きますか。", "一緒に 行きませんか。", "一緒に 行きましょう。", "一緒に 行ってください。"],
        answer: "一緒に 行きませんか。"
      },
      {
        question: "友達 (  ) 会います。",
        options: ["に", "を", "へ", "で"],
        answer: "に"
      },
      {
        question: "A: 一緒に食べませんか。 B: ええ、(  )。",
        options: ["食べましょう", "食べません", "食べました", "食べますか"],
        answer: "食べましょう"
      },
      {
        question: "今朝 何 (  ) 食べませんでした。",
        options: ["も", "を", "が", "に"],
        answer: "も"
      },
      {
        question: "それから、花 (  ) 見ました。",
        options: ["を", "で", "に", "へ"],
        answer: "を"
      },
      {
        question: "翻譯：稍微休息一下吧。",
        options: ["ちょっと 休みましょう。", "ちょっと 休みません。", "ちょっと 休みました。", "ちょっと 休みます。"],
        answer: "ちょっと 休みましょう。"
      },
      {
        question: "「照片」的日文是？",
        options: ["しゃしん", "えいが", "てがみ", "みせ"],
        answer: "しゃしん"
      }
    ]
  }
];

// --- 附錄資料 ---
const appendixData = {
  numbers: {
    title: "數字 (Numbers)",
    icon: Hash,
    items: [
      // 個位數
      { jp: "0", kana: "ゼロ / れい", romaji: "zero / rei" },
      { jp: "1", kana: "いち", romaji: "ichi" },
      { jp: "2", kana: "に", romaji: "ni" },
      { jp: "3", kana: "さん", romaji: "san" },
      { jp: "4", kana: "よん / し", romaji: "yon / shi" },
      { jp: "5", kana: "ご", romaji: "go" },
      { jp: "6", kana: "ろく", romaji: "roku" },
      { jp: "7", kana: "なな / しち", romaji: "nana / shichi" },
      { jp: "8", kana: "はち", romaji: "hachi" },
      { jp: "9", kana: "きゅう / く", romaji: "kyuu / ku" },
      { jp: "10", kana: "じゅう", romaji: "juu" },
      
      // 11-20
      { jp: "11", kana: "じゅういち", romaji: "juuichi" },
      { jp: "12", kana: "じゅうに", romaji: "juuni" },
      { jp: "13", kana: "じゅうさん", romaji: "juusan" },
      { jp: "14", kana: "じゅうよん", romaji: "juuyon" },
      { jp: "15", kana: "じゅうご", romaji: "juugo" },
      { jp: "16", kana: "じゅうろく", romaji: "juuroku" },
      { jp: "17", kana: "じゅうなな", romaji: "juunana" },
      { jp: "18", kana: "じゅうはち", romaji: "juuhachi" },
      { jp: "19", kana: "じゅうきゅう", romaji: "juukyuu" },
      { jp: "20", kana: "にじゅう", romaji: "nijuu" },

      // 十位數
      { jp: "30", kana: "さんじゅう", romaji: "sanjuu" },
      { jp: "40", kana: "よんじゅう", romaji: "yonjuu" },
      { jp: "50", kana: "ごじゅう", romaji: "gojuu" },
      { jp: "60", kana: "ろくじゅう", romaji: "rokujuu" },
      { jp: "70", kana: "ななじゅう", romaji: "nanajuu" },
      { jp: "80", kana: "はちじゅう", romaji: "hachijuu" },
      { jp: "90", kana: "きゅうじゅう", romaji: "kyuujuu" },

      // 百位數 (注意 300, 600, 800)
      { jp: "100", kana: "ひゃく", romaji: "hyaku" },
      { jp: "200", kana: "にひゃく", romaji: "nihyaku" },
      { jp: "300", kana: "さんびゃく", romaji: "sanbyaku" },
      { jp: "400", kana: "よんひゃく", romaji: "yonhyaku" },
      { jp: "500", kana: "ごひゃく", romaji: "gohyaku" },
      { jp: "600", kana: "ろっぴゃく", romaji: "roppyaku" },
      { jp: "700", kana: "ななひゃく", romaji: "nanahyaku" },
      { jp: "800", kana: "はっぴゃく", romaji: "happyaku" },
      { jp: "900", kana: "きゅうひゃく", romaji: "kyuuhyaku" },

      // 千位數 (注意 3000, 8000)
      { jp: "1,000", kana: "せん", romaji: "sen" },
      { jp: "2,000", kana: "にせん", romaji: "nisen" },
      { jp: "3,000", kana: "さんぜん", romaji: "sanzen" },
      { jp: "4,000", kana: "よんせん", romaji: "yonsen" },
      { jp: "5,000", kana: "ごせん", romaji: "gosen" },
      { jp: "6,000", kana: "ろくせん", romaji: "rokusen" },
      { jp: "7,000", kana: "ななせん", romaji: "nanasen" },
      { jp: "8,000", kana: "はっせん", romaji: "hassen" },
      { jp: "9,000", kana: "きゅうせん", romaji: "kyuusen" },

      // 萬以上
      { jp: "10,000", kana: "いちまん", romaji: "ichiman" },
      { jp: "100,000", kana: "じゅうまん", romaji: "juuman" },
      { jp: "1,000,000", kana: "ひゃくまん", romaji: "hyakuman" },
      { jp: "10,000,000", kana: "せんまん", romaji: "senman" },
      { jp: "100,000,000", kana: "いちおく", romaji: "ichioku" },
    ]
  },
  time: {
    title: "時間 (Time)",
    icon: Clock,
    description: "注意 4、7、9 的唸法。",
    items: [
      { label: "1:00", kana: "いちじ", romaji: "ichiji" },
      { label: "2:00", kana: "にじ", romaji: "niji" },
      { label: "3:00", kana: "さんじ", romaji: "sanji" },
      { label: "4:00", kana: "よじ (注意)", romaji: "yoji", highlight: true },
      { label: "5:00", kana: "ごじ", romaji: "goji" },
      { label: "6:00", kana: "ろくじ", romaji: "rokuji" },
      { label: "7:00", kana: "しちじ (注意)", romaji: "shichiji", highlight: true },
      { label: "8:00", kana: "はちじ", romaji: "hachiji" },
      { label: "9:00", kana: "くじ (注意)", romaji: "kuji", highlight: true },
      { label: "10:00", kana: "じゅうじ", romaji: "juuji" },
      { label: "11:00", kana: "じゅういちじ", romaji: "juuichiji" },
      { label: "12:00", kana: "じゅうにじ", romaji: "juuniji" },
      { label: "幾點", kana: "なんじ", romaji: "nanji" },
    ],
    minutes: [
      { label: "1分", kana: "いっぷん", romaji: "ippun" },
      { label: "2分", kana: "にふん", romaji: "nifun" },
      { label: "3分", kana: "さんぷん", romaji: "sanpun" },
      { label: "4分", kana: "よんぷん", romaji: "yonpun" },
      { label: "5分", kana: "ごふん", romaji: "gofun" },
      { label: "6分", kana: "ろっぷん", romaji: "roppun" },
      { label: "7分", kana: "ななふん", romaji: "nanafun" },
      { label: "8分", kana: "はっぷん", romaji: "happun" },
      { label: "9分", kana: "きゅうふん", romaji: "kyuufun" },
      { label: "10分", kana: "じゅっぷん", romaji: "juppun" },
      { label: "15分", kana: "じゅうごふん", romaji: "juugofun" },
      { label: "30分", kana: "はん", romaji: "han (半)" },
      { label: "幾分", kana: "なんぷん", romaji: "nanpun" },
    ],
    periods: [
      { label: "上午", kana: "ごぜん", romaji: "gozen" },
      { label: "下午", kana: "ごご", romaji: "gogo" },
      { label: "現在", kana: "いま", romaji: "ima" },
    ]
  },
  timeWords: {
    title: "時候 (Time Words)",
    icon: Watch,
    description: "學習天、週、月、年的時間軸說法。",
    tables: [
      {
        title: "天與時段 (Days & Time of Day)",
        headers: ["前天", "昨天", "今天", "明天", "後天", "每天"],
        rows: [
          { label: "日子", cells: [
            { jp: "一昨日", kana: "おととい" },
            { jp: "昨日", kana: "きのう" },
            { jp: "今日", kana: "きょう" },
            { jp: "明日", kana: "あした" },
            { jp: "明後日", kana: "あさって" },
            { jp: "毎日", kana: "まいにち" }
          ]},
          { label: "早上", cells: [
            { jp: "一昨日の朝", kana: "おとといのあさ" },
            { jp: "昨日の朝", kana: "きのうのあさ" },
            { jp: "今朝", kana: "けさ" },
            { jp: "明日の朝", kana: "あしたのあさ" },
            { jp: "明後日の朝", kana: "あさってのあさ" },
            { jp: "毎朝", kana: "まいあさ" }
          ]},
          { label: "晚上", cells: [
            { jp: "一昨日の晩", kana: "おとといのばん" },
            { jp: "昨夜", kana: "ゆうべ" },
            { jp: "今晩", kana: "こんばん" },
            { jp: "明日の晩", kana: "あしたのばん" },
            { jp: "明後日の晩", kana: "あさってのばん" },
            { jp: "毎晩", kana: "まいばん" }
          ]}
        ]
      },
      {
        title: "週・月・年 (Week / Month / Year)",
        headers: ["上上~", "上~", "這/本~", "下~", "下下~", "每~"],
        rows: [
          { label: "週", cells: [
            { jp: "先々週", kana: "せんせんしゅう" },
            { jp: "先週", kana: "せんしゅう" },
            { jp: "今週", kana: "こんしゅう" },
            { jp: "来週", kana: "らいしゅう" },
            { jp: "再来週", kana: "さらいしゅう" },
            { jp: "毎週", kana: "まいしゅう" }
          ]},
          { label: "月", cells: [
            { jp: "先々月", kana: "せんせんげつ" },
            { jp: "先月", kana: "せんげつ" },
            { jp: "今月", kana: "こんげつ" },
            { jp: "来月", kana: "らいげつ" },
            { jp: "再来月", kana: "さらいげつ" },
            { jp: "毎月", kana: "まいつき" }
          ]},
          { label: "年", cells: [
            { jp: "一昨年", kana: "おととし" },
            { jp: "去年", kana: "きょねん" },
            { jp: "今年", kana: "ことし" },
            { jp: "来年", kana: "らいねん" },
            { jp: "再来年", kana: "さらいねん" },
            { jp: "毎年", kana: "まいとし" }
          ]}
        ]
      }
    ]
  },
  counters: {
    title: "量詞 (Counters)",
    icon: Layers,
    description: "注意數字與量詞結合時的發音變化，紅色為特殊發音。",
    groups: [
      {
        label: "通用・人物",
        items: [
          { 
            unit: "～つ (個)", 
            list: [
              { num: 1, val: "ひとつ" }, 
              { num: 2, val: "ふたつ" }, 
              { num: 3, val: "みっつ" }, 
              { num: 4, val: "よっつ" }, 
              { num: 5, val: "いつつ" }, 
              { num: 6, val: "むっつ" }, 
              { num: 7, val: "ななつ" }, 
              { num: 8, val: "やっつ" }, 
              { num: 9, val: "ここのつ" }, 
              { num: 10, val: "とお" }, 
              { num: "?", val: "いくつ" }
            ]
          },
          { 
            unit: "～人 (人)", 
            list: [
              { num: 1, val: "ひとり", highlight: true }, 
              { num: 2, val: "ふたり", highlight: true }, 
              { num: 3, val: "さんにん" }, 
              { num: 4, val: "よにん", highlight: true }, 
              { num: 5, val: "ごにん" }, 
              { num: 6, val: "ろくにん" }, 
              { num: 7, val: "しちにん" }, 
              { num: 8, val: "はちにん" }, 
              { num: 9, val: "きゅうにん" }, 
              { num: 10, val: "じゅうにん" }, 
              { num: "?", val: "なんにん" }
            ]
          }
        ]
      },
      {
        label: "規則變化 (無特殊音變)",
        items: [
          { 
            unit: "～枚 (張/件)", 
            list: [
              { num: 1, val: "いちまい" }, 
              { num: 2, val: "にまい" }, 
              { num: 3, val: "さんまい" }, 
              { num: 4, val: "よんまい" }, 
              { num: 5, val: "ごまい" }, 
              { num: 6, val: "ろくまい" }, 
              { num: 7, val: "ななまい" }, 
              { num: 8, val: "はちまい" }, 
              { num: 9, val: "きゅうまい" }, 
              { num: 10, val: "じゅうまい" }, 
              { num: "?", val: "なんまい" }
            ]
          },
          { 
            unit: "～台 (台/輛)", 
            list: [
              { num: 1, val: "いちだい" }, 
              { num: 2, val: "にだい" }, 
              { num: 3, val: "さんだい" }, 
              { num: 4, val: "よんだい" }, 
              { num: 5, val: "ごだい" }, 
              { num: 6, val: "ろくだい" }, 
              { num: 7, val: "ななだい" }, 
              { num: 8, val: "はちだい" }, 
              { num: 9, val: "きゅうだい" }, 
              { num: 10, val: "じゅうだい" }, 
              { num: "?", val: "なんだい" }
            ]
          },
          { 
            unit: "～番 (號)", 
            list: [
              { num: 1, val: "いちばん" }, 
              { num: 2, val: "にばん" }, 
              { num: 3, val: "さんばん" }, 
              { num: 4, val: "よんばん" }, 
              { num: 5, val: "ごばん" }, 
              { num: 6, val: "ろくばん" }, 
              { num: 7, val: "ななばん" }, 
              { num: 8, val: "はちばん" }, 
              { num: 9, val: "きゅうばん" }, 
              { num: 10, val: "じゅうばん" }, 
              { num: "?", val: "なんばん" }
            ]
          },
        ]
      },
      {
        label: "音變：歲・冊・回・個 (1, 8, 10 促音)",
        items: [
          { 
            unit: "～歳 (歲)", 
            list: [
              { num: 1, val: "いっさい", highlight: true }, 
              { num: 2, val: "にさい" }, 
              { num: 3, val: "さんさい" }, 
              { num: 4, val: "よんさい" }, 
              { num: 5, val: "ごさい" }, 
              { num: 6, val: "ろくさい" }, 
              { num: 7, val: "ななさい" }, 
              { num: 8, val: "はっさい", highlight: true }, 
              { num: 9, val: "きゅうさい" }, 
              { num: 10, val: "じゅっさい", highlight: true }, 
              { num: 20, val: "はたち", highlight: true }, 
              { num: "?", val: "なんさい" }
            ]
          },
          { 
            unit: "～冊 (本)", 
            list: [
              { num: 1, val: "いっさつ", highlight: true }, 
              { num: 2, val: "にさつ" }, 
              { num: 3, val: "さんさつ" }, 
              { num: 4, val: "よんさつ" }, 
              { num: 5, val: "ごさつ" }, 
              { num: 6, val: "ろくさつ" }, 
              { num: 7, val: "ななさつ" }, 
              { num: 8, val: "はっさつ", highlight: true }, 
              { num: 9, val: "きゅうさつ" }, 
              { num: 10, val: "じゅっさつ", highlight: true }, 
              { num: "?", val: "なんさつ" }
            ]
          },
          { 
            unit: "～回 (次)", 
            list: [
              { num: 1, val: "いっかい", highlight: true }, 
              { num: 2, val: "にかい" }, 
              { num: 3, val: "さんかい" }, 
              { num: 4, val: "よんかい" }, 
              { num: 5, val: "ごかい" }, 
              { num: 6, val: "ろっかい", highlight: true }, 
              { num: 7, val: "ななかい" }, 
              { num: 8, val: "はっかい", highlight: true }, 
              { num: 9, val: "きゅうかい" }, 
              { num: 10, val: "じゅっかい", highlight: true }, 
              { num: "?", val: "なんかい" }
            ]
          },
          { 
            unit: "～個 (個)", 
            list: [
              { num: 1, val: "いっこ", highlight: true }, 
              { num: 2, val: "にこ" }, 
              { num: 3, val: "さんこ" }, 
              { num: 4, val: "よんこ" }, 
              { num: 5, val: "ごこ" }, 
              { num: 6, val: "ろっこ", highlight: true }, 
              { num: 7, val: "ななこ" }, 
              { num: 8, val: "はっこ", highlight: true }, 
              { num: 9, val: "きゅうこ" }, 
              { num: 10, val: "じゅっこ", highlight: true }, 
              { num: "?", val: "なんこ" }
            ]
          }
        ]
      },
      {
        label: "音變：着・階・足・軒 (濁音與促音)",
        items: [
          { 
            unit: "～着 (件)", 
            list: [
              { num: 1, val: "いっちゃく", highlight: true }, 
              { num: 2, val: "にちゃく" }, 
              { num: 3, val: "さんちゃく" }, 
              { num: 4, val: "よんちゃく" }, 
              { num: 5, val: "ごちゃく" }, 
              { num: 6, val: "ろくちゃく" }, 
              { num: 7, val: "ななちゃく" }, 
              { num: 8, val: "はっちゃく", highlight: true }, 
              { num: 9, val: "きゅうちゃく" }, 
              { num: 10, val: "じゅっちゃく", highlight: true }, 
              { num: "?", val: "なんちゃく" }
            ]
          },
          { 
            unit: "～階 (樓)", 
            list: [
              { num: 1, val: "いっかい", highlight: true }, 
              { num: 2, val: "にかい" }, 
              { num: 3, val: "さんがい", highlight: true }, 
              { num: 4, val: "よんかい" }, 
              { num: 5, val: "ごかい" }, 
              { num: 6, val: "ろっかい", highlight: true }, 
              { num: 7, val: "ななかい" }, 
              { num: 8, val: "はっかい", highlight: true }, 
              { num: 9, val: "きゅうかい" }, 
              { num: 10, val: "じゅっかい", highlight: true }, 
              { num: "?", val: "なんがい" }
            ]
          },
          { 
            unit: "～足 (雙)", 
            list: [
              { num: 1, val: "いっそく", highlight: true }, 
              { num: 2, val: "にそく" }, 
              { num: 3, val: "さんぞく", highlight: true }, 
              { num: 4, val: "よんそく" }, 
              { num: 5, val: "ごそく" }, 
              { num: 6, val: "ろくそく" }, 
              { num: 7, val: "ななそく" }, 
              { num: 8, val: "はっそく", highlight: true }, 
              { num: 9, val: "きゅうそく" }, 
              { num: 10, val: "じゅっそく", highlight: true }, 
              { num: "?", val: "なんぞく" }
            ]
          },
          { 
            unit: "～軒 (房屋)", 
            list: [
              { num: 1, val: "いっけん", highlight: true }, 
              { num: 2, val: "にけん" }, 
              { num: 3, val: "さんげん", highlight: true }, 
              { num: 4, val: "よんけん" }, 
              { num: 5, val: "ごけん" }, 
              { num: 6, val: "ろっけん", highlight: true }, 
              { num: 7, val: "ななけん" }, 
              { num: 8, val: "はっけん", highlight: true }, 
              { num: 9, val: "きゅうけん" }, 
              { num: 10, val: "じゅっけん", highlight: true }, 
              { num: "?", val: "なんげん" }
            ]
          }
        ]
      },
      {
        label: "音變：本・杯・匹 (h行大幅變化)",
        items: [
          { 
            unit: "～本 (細長)", 
            list: [
              { num: 1, val: "いっぽん", highlight: true }, 
              { num: 2, val: "にほん" }, 
              { num: 3, val: "さんぼん", highlight: true }, 
              { num: 4, val: "よんほん" }, 
              { num: 5, val: "ごほん" }, 
              { num: 6, val: "ろっぽん", highlight: true }, 
              { num: 7, val: "ななほん" }, 
              { num: 8, val: "はっぽん", highlight: true }, 
              { num: 9, val: "きゅうほん" }, 
              { num: 10, val: "じゅっぽん", highlight: true }, 
              { num: "?", val: "なんぼん" }
            ]
          },
          { 
            unit: "～杯 (杯)", 
            list: [
              { num: 1, val: "いっぱい", highlight: true }, 
              { num: 2, val: "にはい" }, 
              { num: 3, val: "さんばい", highlight: true }, 
              { num: 4, val: "よんはい" }, 
              { num: 5, val: "ごはい" }, 
              { num: 6, val: "ろっぱい", highlight: true }, 
              { num: 7, val: "ななはい" }, 
              { num: 8, val: "はっぱい", highlight: true }, 
              { num: 9, val: "きゅうはい" }, 
              { num: 10, val: "じゅっぱい", highlight: true }, 
              { num: "?", val: "なんばい" }
            ]
          },
          { 
            unit: "～匹 (小動物)", 
            list: [
              { num: 1, val: "いっぴき", highlight: true }, 
              { num: 2, val: "にひき" }, 
              { num: 3, val: "さんびき", highlight: true }, 
              { num: 4, val: "よんひき" }, 
              { num: 5, val: "ごひき" }, 
              { num: 6, val: "ろっぴき", highlight: true }, 
              { num: 7, val: "ななひき" }, 
              { num: 8, val: "はっぴき", highlight: true }, 
              { num: 9, val: "きゅうひき" }, 
              { num: 10, val: "じゅっぴき", highlight: true }, 
              { num: "?", val: "なんびき" }
            ]
          }
        ]
      }
    ]
  },
  calendar: {
    title: "日期與星期 (Calendar)",
    icon: Calendar,
    description: "注意4、7、9月的唸法。日期中1-10、14、20、24號是特殊讀音。",
    weekdays: [
      { label: "日", kanji: "日曜日", kana: "にちようび", romaji: "nichiyoubi" },
      { label: "一", kanji: "月曜日", kana: "げつようび", romaji: "getsuyoubi" },
      { label: "二", kanji: "火曜日", kana: "かようび", romaji: "kayoubi" },
      { label: "三", kanji: "水曜日", kana: "すいようび", romaji: "suiyoubi" },
      { label: "四", kanji: "木曜日", kana: "もくようび", romaji: "mokuyoubi" },
      { label: "五", kanji: "金曜日", kana: "きんようび", romaji: "kinyoubi" },
      { label: "六", kanji: "土曜日", kana: "どようび", romaji: "doyoubi" },
      { label: "幾", kanji: "何曜日", kana: "なんようび", romaji: "nanyoubi" },
    ],
    months: [
      { label: "1月", kana: "いちがつ", romaji: "ichigatsu" },
      { label: "2月", kana: "にがつ", romaji: "nigatsu" },
      { label: "3月", kana: "さんがつ", romaji: "sangatsu" },
      { label: "4月", kana: "しがつ (注意)", romaji: "shigatsu", highlight: true },
      { label: "5月", kana: "ごがつ", romaji: "gogatsu" },
      { label: "6月", kana: "ろくがつ", romaji: "rokugatsu" },
      { label: "7月", kana: "しちがつ (注意)", romaji: "shichigatsu", highlight: true },
      { label: "8月", kana: "はちがつ", romaji: "hachigatsu" },
      { label: "9月", kana: "くがつ (注意)", romaji: "kugatsu", highlight: true },
      { label: "10月", kana: "じゅうがつ", romaji: "juugatsu" },
      { label: "11月", kana: "じゅういちがつ", romaji: "juuichigatsu" },
      { label: "12月", kana: "じゅうにがつ", romaji: "juunigatsu" },
      { label: "幾月", kana: "なんがつ", romaji: "nangatsu" },
    ],
    days: [
      { label: "1日", kana: "ついたち", romaji: "tsuitachi", highlight: true },
      { label: "2日", kana: "ふつか", romaji: "futsuka", highlight: true },
      { label: "3日", kana: "みっか", romaji: "mikka", highlight: true },
      { label: "4日", kana: "よっか", romaji: "yokka", highlight: true },
      { label: "5日", kana: "いつか", romaji: "itsuka", highlight: true },
      { label: "6日", kana: "むいか", romaji: "muika", highlight: true },
      { label: "7日", kana: "なのか", romaji: "nanoka", highlight: true },
      { label: "8日", kana: "ようか", romaji: "youka", highlight: true },
      { label: "9日", kana: "ここのか", romaji: "kokonoka", highlight: true },
      { label: "10日", kana: "とおか", romaji: "tooka", highlight: true },
      { label: "11日", kana: "じゅういちにち", romaji: "juuichinichi" },
      { label: "12日", kana: "じゅうににち", romaji: "juuninichi" },
      { label: "13日", kana: "じゅうさんにち", romaji: "juusannichi" },
      { label: "14日", kana: "じゅうよっか", romaji: "juuyokka", highlight: true },
      { label: "15日", kana: "じゅうごにち", romaji: "juugonichi" },
      { label: "16日", kana: "じゅうろくにち", romaji: "juurokunichi" },
      { label: "17日", kana: "じゅうしちにち", romaji: "juushichinichi" },
      { label: "18日", kana: "じゅうはちにち", romaji: "juuhachinichi" },
      { label: "19日", kana: "じゅうくにち", romaji: "juukunichi" },
      { label: "20日", kana: "はつか", romaji: "hatsuka", highlight: true },
      { label: "21日", kana: "にじゅういちにち", romaji: "nijuuichinichi" },
      { label: "22日", kana: "にじゅうににち", romaji: "nijuuninichi" },
      { label: "23日", kana: "にじゅうさんにち", romaji: "nijuusannichi" },
      { label: "24日", kana: "にじゅうよっか", romaji: "nijuuyokka", highlight: true },
      { label: "25日", kana: "にじゅうごにち", romaji: "nijuugonichi" },
      { label: "26日", kana: "にじゅうろくにち", romaji: "nijuurokunichi" },
      { label: "27日", kana: "にじゅうしちにち", romaji: "nijuushichinichi" },
      { label: "28日", kana: "にじゅうはちにち", romaji: "nijuuhachinichi" },
      { label: "29日", kana: "にじゅうくにち", romaji: "nijuukunichi" },
      { label: "30日", kana: "さんじゅうにち", romaji: "sanjuunichi" },
      { label: "31日", kana: "さんじゅういちにち", romaji: "sanjuuichinichi" },
      { label: "幾號", kana: "なんにち", romaji: "nannichi" },
    ]
  },
  family: {
    title: "家族稱謂 (Family)",
    icon: Users,
    description: "稱呼自己的家人 vs 稱呼別人的家人。",
    items: [
      { relation: "祖父", my: "祖父 (そふ)", other: "おじいさん" },
      { relation: "祖母", my: "祖母 (そぼ)", other: "おばあさん" },
      { relation: "父", my: "父 (ちち)", other: "お父さん (おとうさん)" },
      { relation: "母", my: "母 (はは)", other: "お母さん (おかあさん)" },
      { relation: "兄", my: "兄 (あに)", other: "お兄さん (おにいさん)" },
      { relation: "姉", my: "姉 (あね)", other: "お姉さん (おねえさん)" },
      { relation: "弟", my: "弟 (おとうと)", other: "弟さん (おとうとさん)" },
      { relation: "妹", my: "妹 (いもうと)", other: "妹さん (いもうとさん)" },
      { relation: "丈夫", my: "夫 (おっと) / 主人 (しゅじん)", other: "ご主人 (ごしゅじん)" },
      { relation: "妻子", my: "妻 (つま) / 家内 (かない)", other: "奥さん (おくさん)" },
    ]
  }
};

// --- 組件 ---

const VocabularyList = ({ vocab, relatedVocab }) => (
  <div className="space-y-8">
    {/* 核心單字 */}
    <div className="overflow-x-auto">
      <div className="flex items-center space-x-2 mb-3">
        <Star size={20} className="text-yellow-500 fill-yellow-500" />
        <h4 className="text-lg font-bold text-gray-800">核心單字 (Core Vocabulary)</h4>
      </div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-indigo-100">
        <thead className="bg-indigo-50">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-900">漢字</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-900">假名</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-900 hidden sm:table-cell">羅馬拼音</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-900">中文意思</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-indigo-50">
          {vocab.map((word) => (
            <tr key={word.id} className="hover:bg-indigo-50/50 transition-colors">
              <td className="py-3 px-4 text-lg font-medium text-gray-800">{word.kanji}</td>
              <td className="py-3 px-4 text-indigo-600 font-medium">{word.kana}</td>
              <td className="py-3 px-4 text-gray-500 text-sm hidden sm:table-cell">{word.romaji}</td>
              <td className="py-3 px-4 text-gray-700">{word.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* 關聯單字 */}
    {relatedVocab && relatedVocab.length > 0 && (
      <div>
        {relatedVocab.map((section) => (
          <div key={section.id} className="mt-8">
             <div className="flex items-center space-x-2 mb-3">
              <BookOpen size={20} className="text-emerald-600" />
              <h4 className="text-lg font-bold text-gray-800">參考詞彙：{section.category}</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.list.map((word, idx) => (
                <div key={idx} className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex flex-col">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-lg font-bold text-gray-800">{word.kanji}</span>
                    <span className="text-sm text-emerald-700 font-medium">{word.kana}</span>
                  </div>
                  <span className="text-sm text-gray-600">{word.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const GrammarSection = ({ grammar }) => (
  <div className="space-y-6">
    {grammar.map((item) => (
      <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-orange-100 border-l-4 border-l-orange-400">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded mr-2">句型 {item.id}</span>
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {item.explanation}
        </p>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
          <p className="text-sm text-gray-500 mb-3 font-semibold flex items-center">
            <CheckCircle size={14} className="mr-1" /> 例句運用：
          </p>
          <div className="space-y-3">
            {item.examples && item.examples.map((ex, idx) => (
              <div key={idx} className="border-l-2 border-indigo-200 pl-3">
                <p className="text-lg text-indigo-700 font-medium leading-snug">{ex.jp}</p>
                <p className="text-sm text-gray-600">{ex.cn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const QuizSection = ({ quiz, isReviewMode = false }) => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
    setShowResult(false);
  };

  const checkScore = () => {
    setShowResult(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8">
      {quiz.map((q, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <div className="flex justify-between items-start mb-4">
            <p className="font-medium text-lg text-gray-800">
              <span className="text-emerald-600 font-bold mr-2">Q{idx + 1}.</span>
              {q.question}
            </p>
            {isReviewMode && (
               <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-full whitespace-nowrap">
                 來自: {q.sourceLesson}
               </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(idx, option)}
                className={`p-3 text-left rounded-md border transition-all ${
                  answers[idx] === option
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                    : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`mt-4 p-3 rounded-md text-sm font-bold flex items-center ${
              answers[idx] === q.answer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {answers[idx] === q.answer ? (
                <><CheckCircle size={18} className="mr-2" /> 正解！太棒了。</>
              ) : (
                <><X size={18} className="mr-2" /> 殘念... 正確答案是：{q.answer}</>
              )}
            </div>
          )}
        </div>
      ))}
      
      <div className="flex flex-col items-center justify-center mt-8 pt-8 border-t border-gray-200">
        {!showResult ? (
          <button
            onClick={checkScore}
            disabled={Object.keys(answers).length !== quiz.length}
            className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg transition-transform transform active:scale-95 ${
              Object.keys(answers).length !== quiz.length
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            提交答案
          </button>
        ) : (
          <div className="text-center animate-fade-in">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              得分：{getScore()} / {quiz.length}
            </p>
            <p className="text-gray-600">
              {getScore() === quiz.length ? "全對！你是天才嗎？ 🎉" : "再接再厲，多練習幾次吧！ 💪"}
            </p>
            <button 
              onClick={() => { setAnswers({}); setShowResult(false); if(isReviewMode) window.scrollTo({top:0, behavior:'smooth'}); }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium underline flex items-center justify-center mx-auto"
            >
              <RefreshCcw size={16} className="mr-1" />
              {isReviewMode ? "再抽 20 題挑戰" : "重新測驗"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 附錄組件 ---
const AppendixSection = () => {
  const [activeCategory, setActiveCategory] = useState('numbers');
  
  const categories = [
    { id: 'numbers', label: '數字', icon: appendixData.numbers.icon },
    { id: 'time', label: '時間', icon: appendixData.time.icon },
    { id: 'timeWords', label: '時候', icon: appendixData.timeWords.icon },
    { id: 'calendar', label: '日期', icon: appendixData.calendar.icon },
    { id: 'counters', label: '量詞', icon: appendixData.counters.icon },
    { id: 'family', label: '家族', icon: appendixData.family.icon },
  ];

  const renderContent = () => {
    switch(activeCategory) {
      case 'numbers':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {appendixData.numbers.items.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">{item.jp}</div>
                <div className="text-sm font-medium text-gray-800 mb-1">{item.kana}</div>
                <div className="text-xs text-gray-500">{item.romaji}</div>
              </div>
            ))}
          </div>
        );
      case 'time':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">時段 (Period)</h4>
              <div className="flex gap-4">
                {appendixData.time.periods.map((item, idx) => (
                  <div key={idx} className="bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100 flex-1 text-center">
                    <div className="font-bold text-indigo-800 text-lg mb-1">{item.label}</div>
                    <div className="text-sm text-gray-600">{item.kana}</div>
                    <div className="text-xs text-gray-400">{item.romaji}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">小時 (Hour)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appendixData.time.items.map((item, idx) => (
                  <div key={idx} className={`bg-white p-3 rounded-lg border ${item.highlight ? 'border-red-300 bg-red-50' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800">{item.label}</span>
                      {item.highlight && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">注意</span>}
                    </div>
                    <div className={`text-sm ${item.highlight ? 'text-red-700 font-bold' : 'text-gray-600'}`}>{item.kana}</div>
                    <div className="text-xs text-gray-400">{item.romaji}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">分鐘 (Minute)</h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appendixData.time.minutes.map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="font-bold text-gray-800 mb-1">{item.label}</div>
                    <div className="text-sm text-gray-600">{item.kana}</div>
                    <div className="text-xs text-gray-400">{item.romaji}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'timeWords':
        return (
          <div className="space-y-12">
            {appendixData.timeWords.tables.map((table, tIdx) => (
              <div key={tIdx}>
                <h4 className="font-bold text-gray-700 mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white p-1 rounded mr-2"><Clock size={16}/></span>
                  {table.title}
                </h4>
                
                {/* 響應式捲動容器 */}
                <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-bold text-indigo-500 uppercase tracking-wider sticky left-0 bg-indigo-50 z-10 w-24">
                          分類
                        </th>
                        {table.headers.map((header, hIdx) => (
                          <th key={hIdx} className="py-3 px-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px]">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="py-3 px-4 text-sm font-bold text-indigo-700 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-gray-100">
                            {row.label}
                          </td>
                          {row.cells.map((cell, cIdx) => (
                            <td key={cIdx} className="py-3 px-2 text-center align-top">
                              <div className="text-lg font-bold text-gray-800">{cell.jp}</div>
                              <div className="text-xs text-gray-500 font-medium mt-0.5">{cell.kana}</div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">* 手機版可左右滑動查看完整表格</p>
              </div>
            ))}
          </div>
        );
      case 'calendar':
        return (
           <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">星期 (Weekdays)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {appendixData.calendar.weekdays.map((item, idx) => (
                  <div key={idx} className="bg-indigo-50 p-3 rounded-md border border-indigo-100 text-center">
                    <div className="text-xs text-indigo-400 font-bold mb-1">{item.label}</div>
                    <div className="font-bold text-indigo-800 text-lg">{item.kanji}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.kana}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">月份 (Months)</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                 {appendixData.calendar.months.map((item, idx) => (
                  <div key={idx} className={`bg-white p-3 rounded-lg border ${item.highlight ? 'border-red-300 bg-red-50' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800">{item.label}</span>
                      {item.highlight && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">注意</span>}
                    </div>
                    <div className={`text-sm ${item.highlight ? 'text-red-700 font-bold' : 'text-gray-700'}`}>{item.kana}</div>
                    <div className="text-xs text-gray-400">{item.romaji}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">日期讀音 (Days)</h4>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                 {appendixData.calendar.days.map((item, idx) => (
                  <div key={idx} className={`bg-white p-3 rounded-lg border ${item.highlight ? 'border-orange-300 bg-orange-50' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800">{item.label}</span>
                      {item.highlight && <span className="text-[10px] bg-orange-200 text-orange-700 px-1 rounded">特</span>}
                    </div>
                    <div className={`text-sm ${item.highlight ? 'text-orange-700 font-bold' : 'text-gray-600'}`}>{item.romaji}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.kana}</div> 
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'counters':
        return (
          <div className="space-y-10">
            {appendixData.counters.groups.map((group, gIdx) => (
              <div key={gIdx}>
                <h4 className="font-bold text-gray-700 mb-4 flex items-center border-b pb-2">
                  <span className="bg-emerald-600 text-white p-1 rounded mr-2"><Layers size={16}/></span>
                  {group.label}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {group.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 font-bold text-emerald-800 text-center">
                        {item.unit}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {item.list.map((row, rIdx) => (
                          <div key={rIdx} className="flex px-4 py-2 text-sm hover:bg-gray-50">
                            <span className="w-8 font-bold text-gray-400">{row.num}</span>
                            <span className={`flex-1 font-medium ${row.highlight ? 'text-red-600' : 'text-gray-700'}`}>
                              {row.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
       case 'family':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">稱謂</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-700">自己的家人 (謙稱)</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-emerald-700">別人的家人 (尊稱)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appendixData.family.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">{item.relation}</td>
                    <td className="py-3 px-4 text-gray-600">{item.my}</td>
                    <td className="py-3 px-4 text-gray-600">{item.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === cat.id 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <cat.icon size={16} className="mr-2" />
            {cat.label}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-6">
           <h3 className="text-2xl font-bold text-gray-800">{appendixData[activeCategory].title}</h3>
           {appendixData[activeCategory].description && (
             <p className="text-gray-500 mt-1">{appendixData[activeCategory].description}</p>
           )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

// --- 主應用程式 ---

const App = () => {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState('vocab'); // 'vocab', 'grammar', 'quiz'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('lesson'); // 'lesson', 'review', 'appendix'
  const [reviewQuestions, setReviewQuestions] = useState([]);

  const currentLesson = lessonsData.find(l => l.id === currentLessonId);

  const tabs = [
    { id: 'vocab', label: '單字表', icon: BookOpen },
    { id: 'grammar', label: '文法解說', icon: GraduationCap },
    { id: 'quiz', label: '練習測驗', icon: CheckCircle },
  ];

  // 生成 20 題隨機測驗的函數
  const startReviewQuiz = () => {
    const allQuestions = lessonsData.flatMap(lesson => 
      lesson.quiz.map(q => ({ ...q, sourceLesson: lesson.title.split('：')[0] }))
    );
    
    // Fisher-Yates Shuffle
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    
    setReviewQuestions(allQuestions.slice(0, 20));
    setViewMode('review');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLessonChange = (id) => {
    setViewMode('lesson');
    setCurrentLessonId(id);
    setActiveTab('vocab');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToAppendix = () => {
    setViewMode('appendix');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      {/* 頂部導航 */}
      <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              className="lg:hidden p-1 hover:bg-indigo-500 rounded"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Globe size={24} className="text-indigo-200" />
              <h1 className="text-xl font-bold tracking-wide">大家的日本語 <span className="text-indigo-200 text-sm font-normal hidden sm:inline">| 數位教室</span></h1>
            </div>
          </div>
          <div className="text-sm font-medium bg-indigo-700 px-3 py-1 rounded-full border border-indigo-500">
            繁體中文版
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        
        {/* 側邊欄 (課程選擇) */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:min-h-full shadow-xl lg:shadow-none flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center lg:hidden">
            <span className="font-bold text-gray-500">課程列表</span>
            <button onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">課程選擇</h2>
            <div className="space-y-1">
              {lessonsData.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonChange(lesson.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                    viewMode === 'lesson' && currentLessonId === lesson.id
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="truncate">第 {lesson.id} 課</span>
                  {viewMode === 'lesson' && currentLessonId === lesson.id && <ChevronRight size={16} />}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-dashed border-gray-200 pt-6 space-y-2">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">自我挑戰 & 資源</h2>
              
              <button
                onClick={startReviewQuiz}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-between group border-2 ${
                  viewMode === 'review'
                    ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center">
                  <Trophy size={18} className={`mr-2 ${viewMode === 'review' ? 'text-amber-500' : 'text-gray-400 group-hover:text-amber-500'}`} />
                  <span>總複習測驗 (20題)</span>
                </div>
                {viewMode === 'review' && <ChevronRight size={16} />}
              </button>

              <button
                onClick={switchToAppendix}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-between group border-2 ${
                  viewMode === 'appendix'
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center">
                  <BookOpen size={18} className={`mr-2 ${viewMode === 'appendix' ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`} />
                  <span>實用附錄資料</span>
                </div>
                {viewMode === 'appendix' && <ChevronRight size={16} />}
              </button>

            </div>
            
            <div className="mt-8 px-4 py-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-start space-x-3">
                <MessageCircle size={20} className="text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-orange-800">老師的小叮嚀</h4>
                  <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                    別忘了多看附錄裡的「數字」和「日期」念法，尤其是 4、7、9 和 1-10 號的日期，是考試最常出的陷阱喔！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 遮罩 (Mobile Sidebar Overlay) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 主要內容區 */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            
            {viewMode === 'review' && (
              // 總複習模式視圖
              <div className="animate-fade-in-up">
                <div className="mb-8 border-b border-gray-200 pb-6">
                  <div className="flex items-center space-x-2 text-amber-600 font-semibold mb-2">
                    <Trophy size={20} />
                    <span className="uppercase tracking-wide">CHALLENGE MODE</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">第1-6課 綜合實力測驗</h2>
                  <p className="text-lg text-gray-600">
                    系統已隨機抽出 20 題。這包含了助詞、單字、動詞變化等所有範圍。準備好了嗎？加油！
                  </p>
                </div>
                <QuizSection quiz={reviewQuestions} isReviewMode={true} />
              </div>
            )}

            {viewMode === 'appendix' && (
              // 附錄模式視圖
              <div className="animate-fade-in-up">
                 <div className="mb-8 border-b border-gray-200 pb-6">
                  <div className="flex items-center space-x-2 text-blue-600 font-semibold mb-2">
                    <BookOpen size={20} />
                    <span className="uppercase tracking-wide">APPENDIX</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">實用附錄資料庫</h2>
                  <p className="text-lg text-gray-600">
                    這裡整理了學習日語必備的基礎資料，包含數字、時間、日期以及家族稱謂。
                  </p>
                </div>
                <AppendixSection />
              </div>
            )}

            {viewMode === 'lesson' && (
              // 一般課程視圖
              <>
                {/* 課程標題 */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 text-indigo-600 font-semibold mb-1">
                    <span className="bg-indigo-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">Lesson {currentLesson.id}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{currentLesson.title}</h2>
                  <p className="text-lg text-gray-600">{currentLesson.description}</p>
                </div>

                {/* 功能分頁 Tabs */}
                <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 mb-8 sticky top-20 z-20">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon size={18} className="mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* 內容顯示區 */}
                <div className="animate-fade-in-up">
                  {activeTab === 'vocab' && (
                    <div>
                      <VocabularyList vocab={currentLesson.vocab} relatedVocab={currentLesson.relatedVocab} />
                    </div>
                  )}

                  {activeTab === 'grammar' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">文法重點 (Grammar Points)</h3>
                      <GrammarSection grammar={currentLesson.grammar} />
                    </div>
                  )}

                  {activeTab === 'quiz' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">自我練習 (Practice)</h3>
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg mb-6 text-emerald-800 text-sm flex items-start">
                         <div className="bg-emerald-200 text-emerald-800 rounded-full p-1 mr-3 mt-0.5"><CheckCircle size={16} /></div>
                         <div>
                            本課共有 {currentLesson.quiz.length} 題練習。如果您想挑戰更多跨章節的題目，請使用左側選單的「總複習測驗」。
                         </div>
                      </div>
                      <QuizSection quiz={currentLesson.quiz} />
                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;