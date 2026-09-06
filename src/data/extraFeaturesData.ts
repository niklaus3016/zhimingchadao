import { DailyQuote, SolarTermTea, TeaComparison } from '../types';

export const DAILY_QUOTES: DailyQuote[] = [
  {
    id: 'quote-1',
    dateStr: '今日茶语 · 晨光沐心',
    poem: '客来正月九，序爵坐林泉。草色和云暖，茶香带露鲜。',
    author: '钱起',
    dynasty: '唐代',
    explanation: '友人踏春而来，山林泉石间坐定。春草随云影泛起暖意，新泡的茶香还带着山间清晨甘甜的晨露。',
    modernReflection: '放慢脚步，用一盏清茶洗去清晨的倦意。真正的雅致，不在于器物之贵，而在于当下内心的怡然自得。',
    bgStyle: 'linear-gradient(135deg, #244A3A 0%, #1A3429 100%)'
  },
  {
    id: 'quote-2',
    dateStr: '今日茶语 · 午后静心',
    poem: '幸有香茶相对处，满庭秋意一炉烟。',
    author: '陆游',
    dynasty: '宋代',
    explanation: '何其有幸能与这一盏香茶相对而坐，庭院中满是静美秋意，炉火升腾起袅袅轻烟。',
    modernReflection: '无论外界如何纷扰喧嚣，只要为自己烹上一壶热茶，世界便能立刻安静下来，心生安定。',
    bgStyle: 'linear-gradient(135deg, #7C4829 0%, #542F19 100%)'
  },
  {
    id: 'quote-3',
    dateStr: '今日茶语 · 暮色品味',
    poem: '被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。',
    author: '纳兰性德',
    dynasty: '清代',
    explanation: '曾经过往里那些夫妻猜书赌茶、笑闹泼出茶香的平凡黄昏，当年只道是稀松平常，如今回味才知最为珍贵。',
    modernReflection: '珍惜眼前每一杯与家人、朋友共饮的温茶，人间最美好的幸福，往往就藏在这些平淡无奇的寻常烟火里。',
    bgStyle: 'linear-gradient(135deg, #3A574A 0%, #20352C 100%)'
  },
  {
    id: 'quote-4',
    dateStr: '今日茶语 · 夜深观心',
    poem: '寒夜客来茶当酒，竹炉汤沸火初红。寻常一样窗前月，才有梅花便不同。',
    author: '杜耒',
    dynasty: '宋代',
    explanation: '冬夜有知己冒寒来访，以热茶代酒相迎。竹编小炉里水声沸腾，炉炭正红。窗前依旧是那一轮明月，只因有了暗香疏影的梅花，便格外清雅生动。',
    modernReflection: '君子之交淡如水，亦清如茶。无需繁文缛节与浮华应酬，一壶沸水几片茶叶，便是最真挚温暖的款待。',
    bgStyle: 'linear-gradient(135deg, #2E3B35 0%, #1A221E 100%)'
  },
  {
    id: 'quote-5',
    dateStr: '今日茶语 · 豁达从容',
    poem: '且将新火试新茶。诗酒趁年华。',
    author: '苏轼',
    dynasty: '宋代',
    explanation: '何不引新燃的火苗烹煮一壶新采的春茶，趁着大好年华吟诗行乐。即便遭遇坎坷，亦能活出超然与洒脱。',
    modernReflection: '生活哪怕时有风雨，也不要丢失对新鲜事物的热爱与品茗的从容。活在当下，年华正好。',
    bgStyle: 'linear-gradient(135deg, #855C33 0%, #5E3E20 100%)'
  }
];

export const TEA_COMPARISONS: TeaComparison[] = [
  {
    id: 'cmp-longjing-biluochun',
    teaA: '西湖龙井',
    teaB: '洞庭碧螺春',
    title: '名优双绝：西湖龙井 VS 洞庭碧螺春',
    dimensions: [
      {
        feature: '干茶外形',
        aValue: '扁平光滑，挺直尖削，无毫或少毫，形似碗钉',
        bValue: '条索纤细，卷曲如螺，白毫满披如银霜'
      },
      {
        feature: '香气类型',
        aValue: '清香幽雅，带有清鲜嫩板栗香与炒豆兰花香',
        bValue: '花果香馥郁高扬，鲜嫩清烈，俗称“吓煞人香”'
      },
      {
        feature: '汤色口感',
        aValue: '清澈透绿，甘鲜醇爽，回甘持久无涩，齿颊生津',
        bValue: '嫩绿明澈带毫，入口极为鲜爽柔滑，生津迅猛'
      },
      {
        feature: '冲泡手法',
        aValue: '中投法（先水1/3投茶再满）或下投法',
        bValue: '严格上投法（先注水七分满，再轻轻洒入干茶观沉降）'
      },
      {
        feature: '代表产地',
        aValue: '浙江杭州西湖名胜区（狮峰、龙井、梅家坞）',
        bValue: '江苏苏州太湖洞庭东山、西山果木套种茶园'
      }
    ],
    distinguishTip: '【一眼辨茶】：看形——扁平如剑削的是龙井；卷曲如螺丝、毛茸茸披白霜的是碧螺春！'
  },
  {
    id: 'cmp-puer-sheng-shu',
    teaA: '云南普洱生茶',
    teaB: '云南普洱熟茶',
    title: '岁月与陈化：普洱生茶 VS 普洱熟茶',
    dimensions: [
      {
        feature: '核心工艺',
        aValue: '晒青毛茶蒸压成型，未经过人工渥堆，自然后发酵',
        bValue: '1973年创制的人工渥堆发酵工艺，加速转化'
      },
      {
        feature: '干茶色泽',
        aValue: '墨绿色、灰绿色或青褐油润，多显银白毫芽',
        bValue: '红褐色、深黑褐油亮，金毫隐现（金黄芽头）'
      },
      {
        feature: '茶汤颜色',
        aValue: '新茶为黄绿、金黄色；老茶渐转栗红、宝石红',
        bValue: '红浓明亮，如高档干红葡萄酒或深琥珀色'
      },
      {
        feature: '香气口感',
        aValue: '新茶清香高扬、茶气刚烈猛烈，苦涩秒化生津回甘',
        bValue: '陈香、木香、糯米香，无苦无涩，醇厚顺滑温润'
      },
      {
        feature: '茶性功效',
        aValue: '新茶性偏寒凉，强力降脂刮油，生津提神醒脑',
        bValue: '茶性极其温和养胃，暖胃护肠，适合中老年及夜饮'
      }
    ],
    distinguishTip: '【一眼辨茶】：看汤色——金黄清亮是生普；红浓透亮如红酒是熟普！胃弱怕寒选熟普，求茶气回甘选老生普。'
  },
  {
    id: 'cmp-dahongpao-tieguanyin',
    teaA: '武夷大红袍（岩茶）',
    teaB: '安溪铁观音（青茶）',
    title: '乌龙双雄：武夷大红袍 VS 安溪铁观音',
    dimensions: [
      {
        feature: '干茶形态',
        aValue: '条索紧结微卷，乌褐油润，形如蜻蜓头、蛙皮状',
        bValue: '颗粒紧结卷曲，圆滚重实，沉重似铁'
      },
      {
        feature: '焙火程度',
        aValue: '中足火、高火重焙（传统木炭炭焙，火功香浓）',
        bValue: '清香型轻焙（翠绿），浓香型中度炭焙（熟香）'
      },
      {
        feature: '核心韵味',
        aValue: '武夷正岩“岩骨花香”，骨力遒劲，七泡有余香',
        bValue: '天然“观音韵”，高雅清长兰花香，音韵悠扬'
      },
      {
        feature: '适宜水温',
        aValue: '100℃初沸滚开沸水',
        bValue: '95℃-100℃沸水高冲'
      }
    ],
    distinguishTip: '【一眼辨茶】：条索长直乌褐是武夷大红袍；紧结成圆颗粒状如铁豆的是铁观音。'
  },
  {
    id: 'cmp-baihaoyinzhen-anjibaicha',
    teaA: '福鼎白毫银针（真正白茶）',
    teaB: '安吉白茶（绿茶工艺）',
    title: '名实之辨：白毫银针 VS 安吉白茶',
    dimensions: [
      {
        feature: '所属茶类',
        aValue: '【中国六大茶类之白茶】（微发酵，不炒不揉自然萎凋）',
        bValue: '【中国六大茶类之绿茶】（按绿茶杀青、理条、烘干制成）'
      },
      {
        feature: '原料形态',
        aValue: '肥壮单芽，通体披满厚密白毫，银白如雪針',
        bValue: '条索挺直略扁，形如蕙兰凤羽，叶片玉白而叶脉翠绿'
      },
      {
        feature: '主要风味',
        aValue: '清润毫香，清甜如蜜，汤质细腻温雅',
        bValue: '鲜爽无匹如鸡汤（氨基酸含量约6%-10%，为普通绿茶数倍）'
      },
      {
        feature: '保质储藏',
        aValue: '适合长期存放陈化，“一年茶三年药七年宝”',
        bValue: '绿茶属性，必须密封低温冷藏保鲜，1年内饮完为宜'
      }
    ],
    distinguishTip: '【避坑常识】：安吉白茶名字带“白”，但工艺与本质是绿茶！需要冷藏；白毫银针才是传统白茶之王，可常温久藏越陈越香。'
  }
];

export const SOLAR_TERM_TEAS: SolarTermTea[] = [
  {
    name: '春季 · 萌发生机',
    solarTerm: '立春 / 雨水 / 惊蛰 / 春分',
    season: 'spring',
    dateRange: '2月至4月',
    healthConcept: '春三月，此谓发陈。天地俱生，万物以荣。宜升发阳气，疏肝理气。',
    recommendedTea: '高香花茶（茉莉花茶）、明前嫩绿茶（龙井、碧螺春）',
    reason: '香气高昂的花茶能有效驱散冬天积聚在体内的寒气，促进体内阳气生发；鲜爽绿茶则清肝明目、提振精神。',
    taboo: '初春气温多变，脾胃虚寒者不可过量暴饮冰冷浓绿茶。'
  },
  {
    name: '夏季 · 消暑清热',
    solarTerm: '立夏 / 小满 / 芒种 / 夏至 / 小暑 / 大暑',
    season: 'summer',
    dateRange: '5月至7月',
    healthConcept: '夏三月，天地气交，万物华实。暑热多湿，心火旺盛，宜清暑利湿、清热解毒。',
    recommendedTea: '新白茶（白毫银针/白牡丹）、特级绿茶、清香型铁观音',
    reason: '白茶性凉，富含氨基酸与茶多酚，退虚热解暑气效果极佳；绿茶收敛性强，生津止渴、补充流汗流失的钾元素。',
    taboo: '盛夏切忌贪凉狂饮冰镇浓茶，易损伤脾胃阳气导致腹泻。'
  },
  {
    name: '秋季 · 润燥生津',
    solarTerm: '立秋 / 处暑 / 白露 / 秋分 / 寒露 / 霜降',
    season: 'autumn',
    dateRange: '8月至10月',
    healthConcept: '秋三月，天气以急，地气以明。秋风萧瑟燥邪当令，宜润燥润肺、温和调中。',
    recommendedTea: '乌龙茶（武夷岩茶、凤凰单丛）、轻发酵老白茶',
    reason: '青茶（乌龙茶）性平不寒不热，既能清除体内余热，又能生津润喉润肺，有效缓解“秋燥”咽喉干痒。',
    taboo: '秋季干燥，避免饮用重火烘焙火气未退的新岩茶，以免咽喉上火。'
  },
  {
    name: '冬季 · 暖胃御寒',
    solarTerm: '立冬 / 小雪 / 大雪 / 冬至 / 小寒 / 大寒',
    season: 'winter',
    dateRange: '11月至次年1月',
    healthConcept: '冬三月，此谓闭藏。水冰地坼，无扰乎阳。宜温阳暖胃、固本培元、驱寒生温。',
    recommendedTea: '正山小种红茶、云南普洱熟茶、陈年黑茶煮饮',
    reason: '红茶与黑茶经过全发酵与深度渥堆，茶性温和甘润，富含茶红素、茶黄素，能产生热量暖胃健脾、促进循环。',
    taboo: '严禁空腹大量饮用过烫（超过65℃）茶汤，以防烫伤食道黏膜。'
  }
];

export const WALLPAPERS = [
  {
    id: 'wp-1',
    title: '烟雨茶山 · 翠微凝露',
    theme: 'green',
    bg: 'linear-gradient(135deg, #1C3326 0%, #2A4C3A 50%, #15251C 100%)',
    poem: '山中何所有，岭上多白云。一泓清泉水，煮尽千峰春。',
    tags: ['茶山', '水墨', '清幽']
  },
  {
    id: 'wp-2',
    title: '竹炉松风 · 古刹试泉',
    theme: 'brown',
    bg: 'linear-gradient(135deg, #3D2314 0%, #5C3A24 50%, #29170D 100%)',
    poem: '松风水线猎猎作，瓦瓯翻雪清香发。',
    tags: ['煮茶', '禅意', '炭火']
  },
  {
    id: 'wp-3',
    title: '素瓷雪沫 · 瀹茶清谈',
    theme: 'teal',
    bg: 'linear-gradient(135deg, #1F3630 0%, #2E4E45 50%, #172823 100%)',
    poem: '素瓷传静夜，芳气满闲轩。',
    tags: ['茶席', '白瓷', '幽香']
  },
  {
    id: 'wp-4',
    title: '深谷幽岩 · 紫砂涵润',
    theme: 'amber',
    bg: 'linear-gradient(135deg, #3B2A1D 0%, #5E432F 50%, #241A12 100%)',
    poem: '人间珠玉何足取，岂如阳羡一丸泥。',
    tags: ['紫砂', '金石', '包浆']
  }
];
