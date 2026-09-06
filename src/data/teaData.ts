import { TeaItem, TeaCategory } from '../types';

export const TEA_CATEGORIES: {
  key: TeaCategory;
  name: string;
  pinyin: string;
  char: string;
  desc: string;
  color: string;
  accent: string;
  fermentation: string;
  nature: string;
}[] = [
  {
    key: 'green',
    name: '绿茶',
    pinyin: 'Lǜ Chá',
    char: '清',
    desc: '不发酵茶，汤清叶绿，保留鲜叶天然物质，滋味鲜爽',
    color: '#345E43',
    accent: '#4B7B5C',
    fermentation: '0%（不发酵）',
    nature: '性偏寒凉，生津止渴、消暑提神'
  },
  {
    key: 'black',
    name: '红茶',
    pinyin: 'Hóng Chá',
    char: '温',
    desc: '全发酵茶，红汤红叶，香甜味醇，温胃暖身',
    color: '#8B3828',
    accent: '#A84B38',
    fermentation: '100%（全发酵）',
    nature: '性偏温和，暖胃生热、助消化'
  },
  {
    key: 'oolong',
    name: '乌龙茶',
    pinyin: 'Wū Lóng Chá',
    char: '韵',
    desc: '半发酵青茶，兼具绿茶清香与红茶醇厚，岩韵幽长',
    color: '#8A5D2E',
    accent: '#A6733D',
    fermentation: '15% ~ 70%（半发酵）',
    nature: '性平偏温，健脾消食、解油腻'
  },
  {
    key: 'white',
    name: '白茶',
    pinyin: 'Bái Chá',
    char: '雅',
    desc: '微发酵茶，不炒不揉，自然萎凋，一年茶三年药七年宝',
    color: '#718076',
    accent: '#8C9D92',
    fermentation: '5% ~ 10%（微发酵）',
    nature: '新茶微凉，老茶转平温，清热解毒、退虚火'
  },
  {
    key: 'yellow',
    name: '黄茶',
    pinyin: 'Huáng Chá',
    char: '和',
    desc: '轻发酵茶，黄汤黄叶，独特焖黄工艺，醇和回甘',
    color: '#B88228',
    accent: '#D49A36',
    fermentation: '10% ~ 20%（轻发酵）',
    nature: '性微凉，健脾和胃、助消化'
  },
  {
    key: 'dark',
    name: '黑茶',
    pinyin: 'Hēi Chá',
    char: '醇',
    desc: '后发酵茶，渥堆发酵，越陈越香，汤深红透亮',
    color: '#423730',
    accent: '#5E4F45',
    fermentation: '100%（后发酵/微生物陈化）',
    nature: '性温润，刮油降脂、调理肠胃'
  }
];

export const TEA_ITEMS: TeaItem[] = [
  // 1. 绿茶
  {
    id: 'xihu-longjing',
    name: '西湖龙井',
    pinyin: 'Xī Hú Lóng Jǐng',
    category: 'green',
    categoryName: '绿茶',
    aliases: ['龙井茶', '西湖名茶'],
    origin: '浙江省杭州市西湖风景名胜区（狮峰、龙井、云栖、虎跑、梅家坞）',
    fermentation: '0% 不发酵',
    pickingSeason: '春季清明前（明前茶）、谷雨前（雨前茶）',
    grade: '特级、一级、二级、三级',
    coreFeatures: ['色翠', '香郁', '味甘', '形美', '扁平挺直'],
    tasting: {
      shape: '扁平光滑，挺直尖削，匀整重实，色泽糙米色或嫩绿带微黄',
      liquorColor: '清澈透亮，嫩绿微黄，清澄无杂质',
      aroma: '清香幽雅，带有独特的鲜嫩板栗香与炒豆兰花底韵',
      taste: '甘鲜醇爽，初入口柔和鲜嫩，舌底生津明显，回甘持久无涩',
      leafBottom: '幼嫩成朵，嫩绿明亮，匀齐饱满，芽长于叶'
    },
    efficacy: ['提神醒脑', '清热生津', '抗氧化', '利尿消肿', '降脂护齿'],
    suitableFor: ['办公室白领', '脑力工作者', '夏季消暑人群', '注重抗氧化者'],
    notSuitableFor: ['脾胃极其虚寒者', '严重失眠者', '贫血及孕期妇女空腹饮用'],
    notes: '切忌用100℃滚开沸水直冲，否则会烫坏幼嫩芽叶，产生苦涩味与熟叶气。',
    history: {
      originStory: '相传龙井茶始于唐代，陆羽《茶经》已记载杭州天竺、灵隐产茶。乾隆皇帝下江南时，曾在杭州狮峰山下茶园品茗赞叹，将十八棵茶树封为“御茶”。',
      legend: '十八棵御茶树传说：乾隆游狮峰山，见采茶女轻快采茶，一时兴起仿效，后闻母病急归，袖中茶叶经体温压扁溢香，母太后闻香精神一爽，遂赐名并敕封。'
    },
    storage: {
      method: '密封、避光、防潮、冷藏（0℃~5℃冷藏最佳）',
      shelfLife: '12-18个月（保鲜冷藏可延长鲜活度）',
      tips: ['避开异味环境（如冰箱冷冻肉类）', '尽量抽真空或装入双层铁罐', '取茶后立刻封口回温避免凝露']
    },
    brewSummary: {
      temp: 85,
      ratio: '1:50（3克茶配150ml水）',
      vessel: '透明无盖玻璃杯（中投法或下投法）',
      time: '第一泡冲泡1-2分钟，后续递增'
    },
    colorHex: '#3A6B4C'
  },
  {
    id: 'dongting-biluochun',
    name: '洞庭碧螺春',
    pinyin: 'Dòng Tíng Bì Luó Chūn',
    category: 'green',
    categoryName: '绿茶',
    aliases: ['吓煞人香', '洞庭茶'],
    origin: '江苏省苏州市吴中区太湖洞庭东山及西山',
    fermentation: '0% 不发酵',
    pickingSeason: '春分至清明前采摘嫩芽',
    grade: '特一级、特二级、一级、二级',
    coreFeatures: ['条索纤细', '卷曲成螺', '满披白毫', '花果幽香'],
    tasting: {
      shape: '纤细多毫，卷曲如螺螺髻，银绿隐翠，白毫披覆',
      liquorColor: '嫩绿清澈，澄明透亮，漂浮细微茸毫',
      aroma: '兼具清香与鲜爽花果香，幽深持久，俗称“吓煞人香”',
      taste: '入口鲜嫩爽滑，回甘极快，齿颊生香，茶汤绵柔',
      leafBottom: '嫩绿柔匀，芽叶完整，纤细柔嫩成朵'
    },
    efficacy: ['生津解渴', '提神消疲', '清心明目', '促进新陈代谢'],
    suitableFor: ['日常伏案工作', '偏好鲜嫩甘甜茶友', '春夏季清饮'],
    notSuitableFor: ['胃寒腹泻者', '神经衰弱睡前'],
    notes: '建议使用“上投法”：先注水七分满，再将茶叶轻轻投入，观赏“白云翻滚、雪花飞舞”入水沉降之景。',
    history: {
      originStory: '产自太湖七十二峰之洞庭山。相传明代茶农采茶因竹筐已满置于怀中，茶得体温催发异香，众人惊呼“吓煞人香”。清康熙帝南巡品尝后赐名“碧螺春”。',
      legend: '碧螺姑娘传说：太湖洞庭山有美丽善良的碧螺姑娘，与救她的青年阿祥相爱，阿祥病危，碧螺采悬崖神仙野茶嘴嚼含汁哺喂将其救活，茶遂得名。'
    },
    storage: {
      method: '冷藏密封避光防潮',
      shelfLife: '12个月',
      tips: ['极易吸附杂味与受潮，必须使用干燥无味密封铁罐密封']
    },
    brewSummary: {
      temp: 80,
      ratio: '1:50',
      vessel: '直筒透明玻璃杯（上投法）',
      time: '投入后静候1-2分钟即可品饮'
    },
    colorHex: '#4E7D5B'
  },
  {
    id: 'xinyang-maojian',
    name: '信阳毛尖',
    pinyin: 'Xìn Yáng Máo Jiān',
    category: 'green',
    categoryName: '绿茶',
    aliases: ['豫毛峰'],
    origin: '河南省信阳市浉河区、平桥区等地（五云两潭一寨）',
    fermentation: '0% 不发酵',
    pickingSeason: '谷雨前后春茶品质最佳',
    grade: '特级、特一、特二、一级',
    coreFeatures: ['细圆紧直', '白毫满披', '熟栗浓香', '回甘绵长'],
    tasting: {
      shape: '条索紧细圆直，锋苗挺秀，披覆白毫，色泽翠绿油润',
      liquorColor: '汤色碧绿或黄绿清澄，明澈透亮',
      aroma: '高扬清烈，高香持久，带浓郁熟板栗香',
      taste: '浓厚爽口，回甘生津猛烈，初觉微苦随即化开满口甜润',
      leafBottom: '嫩绿匀整，叶底鲜亮成朵'
    },
    efficacy: ['清头目', '除烦渴', '消食利水', '抗疲劳'],
    suitableFor: ['茶汤偏好浓郁回甜者', '夏季消暑清润'],
    notSuitableFor: ['空腹暴饮', '胃溃疡人群'],
    notes: '毛尖白毫较多，冲泡后汤中可见银毫浮游，非浑浊也，乃茸毫精华。',
    history: {
      originStory: '信阳产茶历史逾两千年。苏东坡曾盛赞：“淮南茶，信阳第一”。1915年巴拿马万国博览会荣获金奖。',
      legend: '九口十八潭传说：信阳山峦起伏，仙山云雾滋养茶树，老茶师取山泉煎茶招待过路文人雅客，因而声名远播。'
    },
    storage: {
      method: '密封低温避光',
      shelfLife: '12-18个月',
      tips: ['开封后尽早饮用，避免温度忽高忽低引起变色']
    },
    brewSummary: {
      temp: 85,
      ratio: '1:50',
      vessel: '白瓷盖碗或玻璃杯',
      time: '首泡约40秒，二泡30秒'
    },
    colorHex: '#3D6B50'
  },
  {
    id: 'anji-baicha',
    name: '安吉白茶',
    pinyin: 'Ān Jí Bái Chá',
    category: 'green',
    categoryName: '绿茶',
    aliases: ['白叶茶'],
    origin: '浙江省湖州市安吉县天荒坪镇等山谷',
    fermentation: '0%（按绿茶工艺加工的低温阶段白化变异茶树品种）',
    pickingSeason: '春季清明前后（气温低于23℃叶绿素缺失阶段）',
    grade: '精品、特级、一级',
    coreFeatures: ['玉白玉叶', '形如凤羽', '氨基酸极高', '鲜爽若鸡汤'],
    tasting: {
      shape: '挺直略扁，形如蕙兰凤羽，色泽翠绿间玉白，隐隐透光',
      liquorColor: '清澈明亮，杏黄嫩绿，鲜活澄澈',
      aroma: '嫩香持久，清甜悠长，伴随鲜雅毫香',
      taste: '极其鲜爽醇滑，氨基酸含量高达6%-10%（为普通绿茶数倍），鲜美如鸡汤',
      leafBottom: '叶白脉翠，叶肉玉白，主脉微翠，薄嫩透明'
    },
    efficacy: ['镇静安神', '护肝明目', '抗疲劳', '美容润肤'],
    suitableFor: ['怕茶苦涩的茶友', '追求鲜甜口感人群', '女性及脑力工作者'],
    notSuitableFor: ['重口味偏浓茶爱好者（会觉得滋味过淡）'],
    notes: '虽名“白茶”，实为绿茶工艺（杀青、理条、烘干），保留了叶绿素缺失阶段的高氨基酸特性。',
    history: {
      originStory: '宋徽宗《大观茶论》记载：“白茶自为一种，生于名山，茎梗甚脆，产无几，其叶如纸”。1982年安吉林科人员在大溪天荒坪发现百年单株白茶古树，繁育成功。',
      legend: '天荒坪古树传说：深山老茶农偶见一株白玉般的野生茶树，春发白叶，夏转青绿，犹如仙羽降世，后经科研繁育成为传世名茶。'
    },
    storage: {
      method: '超低温冷冻或冷藏密封（-5℃至0℃更佳）',
      shelfLife: '12个月',
      tips: ['因叶绿素易分解，受热受光易失去玉白翠色，需防潮严密']
    },
    brewSummary: {
      temp: 85,
      ratio: '1:50',
      vessel: '高硼硅直筒玻璃杯',
      time: '首泡约50秒出汤'
    },
    colorHex: '#528265'
  },

  // 2. 红茶
  {
    id: 'zhengshan-xiaozhong',
    name: '正山小种',
    pinyin: 'Zhèng Shān Xiǎo Zhǒng',
    category: 'black',
    categoryName: '红茶',
    aliases: ['拉普山小种', '红茶鼻祖', 'Lapsang Souchong'],
    origin: '福建省武夷山市星村镇桐木关国家级自然保护区',
    fermentation: '100% 全发酵',
    pickingSeason: '春夏季，谷雨至立夏',
    grade: '特级、一级、二级',
    coreFeatures: ['红茶鼻祖', '松烟香', '桂圆汤味', '红艳明亮'],
    tasting: {
      shape: '条索肥壮重实，色泽乌黑油润带润泽感',
      liquorColor: '深红明亮，金圈明显，宛如琥珀红玉',
      aroma: '传统工艺带有独特的天然马尾松烟香，融入浓郁桂圆干果香',
      taste: '醇厚回甘，浓稠滑润，伴随幽雅甜果味，温和无刺激',
      leafBottom: '柔软明亮，色呈古铜红，叶张完整'
    },
    efficacy: ['暖胃护胃', '促进消化', '舒缓情绪', '增强心肺活力'],
    suitableFor: ['肠胃虚寒者', '秋冬寒冷季节', '嗜甜香醇饮者'],
    notSuitableFor: ['实热上火口干舌燥者', '急性发热人群'],
    notes: '正宗桐木关传统小种带有松烟香与桂圆味；烟正山小种更浓郁，无烟小种则蜜香花香更显。',
    history: {
      originStory: '明朝中后期，官兵借宿武夷山桐木关茶厂，茶农制茶受阻，为抢时间用当地马尾松柴火烘烤发酵茶叶，意外造就独特松烟香红茶，后运抵欧洲风靡王室，成为世界红茶之源。',
      legend: '英王室王后下午茶：葡萄牙凯瑟琳公主嫁入英国王室，将正山小种红茶带入宫廷，引发欧洲下午茶贵族风尚。'
    },
    storage: {
      method: '常温避光、干燥密封、防异味',
      shelfLife: '24-36个月（红茶陈化后风味更加醇和）',
      tips: ['切忌放入冰箱冷藏，常温干燥环境下保存即可']
    },
    brewSummary: {
      temp: 95,
      ratio: '1:30（5克茶配150ml盖碗）',
      vessel: '白瓷盖碗或紫砂壶',
      time: '首泡5-10秒快速出汤，后续每泡增加5秒'
    },
    colorHex: '#8C3D2B'
  },
  {
    id: 'jinjunmei',
    name: '金骏眉',
    pinyin: 'Jīn Jùn Méi',
    category: 'black',
    categoryName: '红茶',
    aliases: ['骏眉红茶'],
    origin: '福建省武夷山市桐木村核心高山茶区（海拔1200-1800米）',
    fermentation: '100% 全发酵',
    pickingSeason: '春季清明前后（每500克需六万至八万颗单芽）',
    grade: '特级单芽',
    coreFeatures: ['单芽精选', '黑黄相间', '蜜香花香', '金黄清透'],
    tasting: {
      shape: '微卷紧结，身骨重实，金黄黑褐相间（金黄非全黄，三黄七黑）',
      liquorColor: '金黄透亮，清澈明净，有淡金圈，非浓红酱色',
      aroma: '复合型蜜香、果香与花香交织，清纯高雅，沁人心脾',
      taste: '甘甜润滑，入口即甜，顺滑如丝绒，连泡十余次甘甜如初',
      leafBottom: '金针秀挺，幼嫩明亮，呈鲜活古铜色'
    },
    efficacy: ['温中健胃', '降逆止呕', '抗自由基', '提神消疲'],
    suitableFor: ['茶道精致品茗', '偏爱细腻甜润口感者', '送礼与待客尊客'],
    notSuitableFor: ['高热实火体质过度饮用'],
    notes: '正宗金骏眉并非满身金毫金黄色，真正顶级桐木关金骏眉色泽黑黄相间（黑多金少）。',
    history: {
      originStory: '2005年由正山茶业江元勋先生率领团队，在传统正山小种红茶工艺基础上创新研发，采摘野生茶芽尖手工精制而成。',
      legend: '命名之意：“金”寓意珍贵如金；“骏”寓意骏马奔腾、原料来自高山崇山峻岭；“眉”因取茶芽如秀眉之形。'
    },
    storage: {
      method: '常温避光干燥密封',
      shelfLife: '36个月',
      tips: ['用双层密封锡罐或密封袋密封防异味即可']
    },
    brewSummary: {
      temp: 90,
      ratio: '1:30（5克茶配150ml盖碗）',
      vessel: '白瓷盖碗',
      time: '注水后即刻出汤（5-8秒），不可久闷'
    },
    colorHex: '#9E4E2C'
  },
  {
    id: 'qimen-hongcha',
    name: '祁门红茶',
    pinyin: 'Qí Mén Hóng Chá',
    category: 'black',
    categoryName: '红茶',
    aliases: ['祁红', '群芳最'],
    origin: '安徽省黄山市祁门县及周边石台、东至、黟县',
    fermentation: '100% 全发酵',
    pickingSeason: '春夏之际采摘一芽一叶或一芽二叶',
    grade: '特级、特贡、一级、二级',
    coreFeatures: ['祁门香', '宝光乌润', '汤红明亮', '蜜糖香花香'],
    tasting: {
      shape: '条索紧细匀齐，锋苗秀丽，色泽乌黑带宝光',
      liquorColor: '红艳透亮，如玛瑙红玉，碗壁金圈厚实',
      aroma: '独具世界赞誉的“祁门香”，似花、似蜜、似果，芬芳馥郁',
      taste: '醇厚甘甜，柔和滑顺，回味悠长，兼具兰花底香',
      leafBottom: '红亮柔嫩，匀齐一致，古铜色泽'
    },
    efficacy: ['帮助胃肠消化', '促进食欲', '强心解毒', '消除水肿'],
    suitableFor: ['下午茶调饮爱好者', '经常饮食不规律肠胃虚弱者', '秋冬温饮'],
    notSuitableFor: ['便秘伴燥热者大量饮用'],
    notes: '与印度大吉岭红茶、斯里兰卡乌瓦红茶并称为“世界三大高香红茶”，既可纯饮亦宜加牛奶做奶茶。',
    history: {
      originStory: '清光绪元年（1875年），黟县人余干臣从福建罢官回皖，借鉴红茶制法在祁门创制祁红成功，迅速风靡英美等国。',
      legend: '英女王珍爱：英国王室将其视为皇室专用茶，“祁门香”在欧洲被尊为茶中之珍。'
    },
    storage: {
      method: '避光、干燥、防异味密封保存',
      shelfLife: '24-36个月',
      tips: ['常温保存，避免阳光直射与潮湿']
    },
    brewSummary: {
      temp: 92,
      ratio: '1:40',
      vessel: '白瓷盖碗或红茶专用壶',
      time: '前三泡约10-15秒出汤'
    },
    colorHex: '#7C2F20'
  },

  // 3. 乌龙茶
  {
    id: 'wuyi-dahongpao',
    name: '武夷大红袍',
    pinyin: 'Wǔ Yí Dà Hóng Páo',
    category: 'oolong',
    categoryName: '乌龙茶',
    aliases: ['武夷岩茶之王', '茶中之王'],
    origin: '福建省武夷山市九龙窠峡谷悬崖及核心正岩产区',
    fermentation: '60% ~ 70% 深度半发酵（重焙火）',
    pickingSeason: '春茶立夏前后采摘开面三四叶',
    grade: '特级、一级',
    coreFeatures: ['岩骨花香', '条索紧结', '炭火幽香', '七泡有余香'],
    tasting: {
      shape: '条索紧结微卷，色泽乌褐油润带熟褐，如蜻蜓头、蛙皮状',
      liquorColor: '深橙黄至红艳清澈，明亮透彻无沉淀',
      aroma: '馥郁高长，兼具天然兰花花香与传统木炭烘焙香（熟果香、焦糖香）',
      taste: '醇厚回甘，具典型武夷正岩“岩韵”，骨力强劲，齿颊留香，七泡余香不减',
      leafBottom: '软亮匀整，红边明显（绿叶红镶边），叶脉粗壮透亮'
    },
    efficacy: ['利尿解乏', '解油化滞', '降脂降糖', '抗衰老', '明目益思'],
    suitableFor: ['油腻饮食后', '老茶客深入品鉴', '喜爱深厚火功茶友'],
    notSuitableFor: ['严重胃溃疡发作期', '神经极易兴奋失眠者夜间'],
    notes: '传统岩茶需“足火”甚至多道炭焙，初制新茶火气重，存放3-6个月退火后品饮口感更佳。',
    history: {
      originStory: '武夷岩茶有上千年历史。明清时期创制半发酵青茶工艺。生长在九龙窠绝壁上的母树仅存六株，极为稀罕。',
      legend: '状元报恩：相传明代一秀才赴京赶考病倒武夷山天心寺，老方丈采岩顶红袍茶树泡汤喂饮，秀才病愈得中状元。状元折返脱下红袍披在茶树上，故名“大红袍”。'
    },
    storage: {
      method: '干燥避光密封，防潮防异味',
      shelfLife: '3-5年（足火岩茶久存愈醇，老岩茶更有药用价值）',
      tips: ['存放数年后可适度复火以保岩韵持久']
    },
    brewSummary: {
      temp: 98,
      ratio: '1:20（8克茶配110-120ml盖碗）',
      vessel: '紫砂壶（朱泥或紫泥最佳）或白瓷盖碗',
      time: '首泡沸水温润润茶后即出，后续每泡10-20秒'
    },
    colorHex: '#7A4926'
  },
  {
    id: 'anxi-tieguanyin',
    name: '安溪铁观音',
    pinyin: 'Ān Xī Tiě Guān Yīn',
    category: 'oolong',
    categoryName: '乌龙茶',
    aliases: ['观音茶', '红心歪尾桃'],
    origin: '福建省泉州市安溪县西坪镇、感德镇、祥华乡高山茶区',
    fermentation: '15% ~ 30%（清香型）/ 40% ~ 50%（浓香/陈香型）',
    pickingSeason: '春茶（谷雨至立夏）、秋茶（寒露霜降质最佳）',
    grade: '特级、一级',
    coreFeatures: ['沉重如铁', '美如观音', '观音韵', '兰花香兰韵'],
    tasting: {
      shape: '颗粒紧结卷曲，呈蜻蜓头、螺旋体、青蛙腿，沉重似铁',
      liquorColor: '清香型金黄带浅绿；浓香型橙黄清澈明亮',
      aroma: '兰花香高扬馥郁，清芬袭人，音韵天然',
      taste: '甘醇甜润，入口清爽，两颊生津，回甘强劲悠长，所谓“独具观音韵”',
      leafBottom: '叶质肥厚柔软，呈绸缎面，叶缘微呈红边（传统工艺）'
    },
    efficacy: ['美容抗衰', '去油脂助消化', '提神醒脑', '防龋齿消口臭'],
    suitableFor: ['日常功夫茶品饮', '解油腻控重餐饮后', '喜爱清雅兰花香者'],
    notSuitableFor: ['清香型性偏寒胃弱者少饮', '月经期妊娠期女子'],
    notes: '清香型需冷藏保鲜（零下5度保香），浓香型和陈香型可常温干燥存放。',
    history: {
      originStory: '相传于清代雍正年间创制，由安溪尧阳茶农发现并精心培植，叶重如铁，形如观音，兼具神异香气。',
      legend: '魏说（观音托梦）与王说（皇恩赐名）：茶农魏荫每日向观音奉清茶，夜梦观音指引石隙得奇茶；另一说是乾隆赐名。'
    },
    storage: {
      method: '清香型需冷冻（-5℃）；浓香型常温密封',
      shelfLife: '清香型12-18个月（需冷藏）；浓香/老茶数年以上',
      tips: ['清香型小泡袋装开封后要尽快冲泡避免跑香']
    },
    brewSummary: {
      temp: 95,
      ratio: '1:20（7-8克配120ml盖碗）',
      vessel: '白瓷盖碗或朱泥小紫砂壶',
      time: '首泡10秒出汤，之后逐渐延长5-10秒'
    },
    colorHex: '#8C6534'
  },
  {
    id: 'fenghuang-dancong',
    name: '凤凰单丛',
    pinyin: 'Fèng Huáng Dān Cóng',
    category: 'oolong',
    categoryName: '乌龙茶',
    aliases: ['潮州工夫茶', '茶中香水'],
    origin: '广东省潮州市潮安区凤凰镇凤凰山乌岽山顶',
    fermentation: '20% ~ 40% 半发酵',
    pickingSeason: '春茶（清明至谷雨）、秋茶及冬茶（雪片）',
    grade: '特级、一级',
    coreFeatures: ['天然花香百变', '茶中香水', '回甘凌厉', '山韵独特'],
    tasting: {
      shape: '条索粗壮匀整，紧结重实，挺直如铁，色泽黄褐微泛光泽',
      liquorColor: '金黄清澈明亮，微红带金，晶莹剔透',
      aroma: '香气馥郁惊艳，品类百变：鸭屎香（银花香）、蜜兰香、黄枝香、桂花香等天然芬芳',
      taste: '醇爽回甘，山韵幽深，微苦涩秒化为甘润，喉韵深长',
      leafBottom: '匀齐红边，叶腹黄绿，富有弹性'
    },
    efficacy: ['行气消滞', '清热降火', '减肥降脂', '生津止渴'],
    suitableFor: ['潮汕工夫茶爱好者', '嗅觉味蕾灵敏者', '老茶饕追香求韵'],
    notSuitableFor: ['空腹暴饮（易导致“茶醉”）'],
    notes: '潮州工夫茶经典：“高冲低斟、刮沫淋盖、关公巡城、韩信点兵”。',
    history: {
      originStory: '南宋末年，宋帝赵昺南逃途经凤凰乌岽山，口渴难耐，侍从采摘山中茶树叶烹煮，饮之生津止渴，赐名“宋茶”。',
      legend: '鸭屎香的由来：茶农怕好茶被别人偷走种苗，谎称长在鸭屎土上、香气似鸭屎，实为浓烈金银花花香，反成名品。'
    },
    storage: {
      method: '避光干燥密封防串味',
      shelfLife: '2-3年（复焙后更佳）',
      tips: ['避免与厨房香精类物品放在同处']
    },
    brewSummary: {
      temp: 100,
      ratio: '1:15（7-8克配100ml潮汕盖碗）',
      vessel: '薄胎白瓷盖碗',
      time: '快速出汤（3-5秒内倒净，不拖泥带水）'
    },
    colorHex: '#935F2B'
  },

  // 4. 白茶
  {
    id: 'fuding-baihaoyinzhen',
    name: '福鼎白毫银针',
    pinyin: 'Fú Dǐng Bái Háo Yín Zhēn',
    category: 'white',
    categoryName: '白茶',
    aliases: ['银针白毫', '白茶皇冠'],
    origin: '福建省宁德市福鼎市太姥山脉核心产区（点头、磻溪、管阳、白琳）',
    fermentation: '5% ~ 10% 微发酵（不炒不揉，自然萎凋、低温烘干）',
    pickingSeason: '春季清明前后首波采摘单芽',
    grade: '特级（米针、头春单芽）',
    coreFeatures: ['满披白毫', '如银似雪', '清甜毫香', '一年茶三年药七年宝'],
    tasting: {
      shape: '芽头肥壮，满披白毫，挺直如针，色白如银，闪耀银光',
      liquorColor: '杏黄或浅金黄，清亮透彻，毫毛隐现如碎金',
      aroma: '毫香清鲜甘爽，伴有若隐若现的野生林木清香与鲜笋香',
      taste: '极为甘甜清润，入口绵软，生津迅速，润喉通窍，无丝毫粗涩感',
      leafBottom: '芽体肥嫩饱满，匀整明亮，直立浮游于水'
    },
    efficacy: ['退热祛火', '清凉解毒', '护肝明目', '防辐射抗氧化'],
    suitableFor: ['发热虚火人群', '咽喉不适者', '养生慢品人群', '长期收藏保值'],
    notSuitableFor: ['极寒虚脱急症患者少饮'],
    notes: '新白茶性凉爽口，存放3年以上的“老白毫银针”转化为温润药香、陈香、枣香，被称为“一年茶三年药七年宝”。',
    history: {
      originStory: '福鼎为中国白茶发源地，太姥山传说神仙太姥娘娘用绿雪芽茶树叶救活患麻疹小儿，此树即白茶母树。清嘉庆元年（1796年）开始人工选育单芽制作银针。',
      legend: '太姥娘娘与绿雪芽：相传尧帝时太姥山有圣母，用石缝中神木茶叶煎汤救活村庄麻疹幼童，后人羽化为仙，世人奉为太姥娘娘。'
    },
    storage: {
      method: '三层包装法（铝箔袋 + 塑料袋 + 严实纸箱），干燥常温阴凉通风',
      shelfLife: '长期陈放（越陈越香，十余年老白茶风味极佳）',
      tips: ['含水量需低于7%，远离异味与潮湿地面']
    },
    brewSummary: {
      temp: 90,
      ratio: '1:35（4-5克茶配150ml）',
      vessel: '透明玻璃盖碗或高杯',
      time: '第一泡温润醒茶，后续浸泡30-45秒出汤'
    },
    colorHex: '#647C70'
  },
  {
    id: 'baimudan',
    name: '白牡丹',
    pinyin: 'Bái Mǔ Dān',
    category: 'white',
    categoryName: '白茶',
    aliases: ['牡丹白茶'],
    origin: '福建省福鼎市、政和县',
    fermentation: '5% ~ 10% 微发酵',
    pickingSeason: '春茶一芽一叶、一芽二叶初展',
    grade: '特级、一级',
    coreFeatures: ['一芽一二叶', '形似牡丹', '花香浓郁', '甘甜稠滑'],
    tasting: {
      shape: '芽叶连枝，两叶抱一芽，宛如含苞欲放之牡丹花朵，绿白相间',
      liquorColor: '杏黄明亮，清澈澄明',
      aroma: '毫香与清幽花香交织，毫香蜜韵，幽长迷人',
      taste: '醇厚清甜，滑润爽口，回甘生津连绵不绝',
      leafBottom: '叶张平展，嫩软匀齐，叶脉带红，主脉翠绿'
    },
    efficacy: ['润肺化痰', '抗衰老', '降血糖', '平衡内分泌'],
    suitableFor: ['日常家庭常备养生茶', '办公室日常泡饮', '白茶收藏入门'],
    notSuitableFor: ['重感冒恶寒畏冷初期'],
    notes: '白牡丹兼具白毫银针之毫香与贡眉寿眉之醇厚，是性价比极高的白茶主力品种。',
    history: {
      originStory: '创制于民国初年，由福鼎茶商在大白茶中采摘一芽一二叶萎凋精制而成，因冲泡在杯中如牡丹盛放而得名。',
      legend: '牡丹仙子降凡尘：传说天上牡丹仙子爱恋人间山水，将仙姿化作茶树，使茶客在品饮间也能领略花开富贵之清芬。'
    },
    storage: {
      method: '常温避光、避潮、密封保存',
      shelfLife: '适合长期陈放（3-15年以上）',
      tips: ['存放在离地离墙30cm以上的纸箱中']
    },
    brewSummary: {
      temp: 92,
      ratio: '1:30',
      vessel: '白瓷盖碗',
      time: '首泡约20秒，后续每泡延长10秒'
    },
    colorHex: '#5A7569'
  },

  // 5. 黄茶
  {
    id: 'junshan-yinzhen',
    name: '君山银针',
    pinyin: 'Jūn Shān Yín Zhēn',
    category: 'yellow',
    categoryName: '黄茶',
    aliases: ['金镶玉', '君山茶'],
    origin: '湖南省岳阳市洞庭湖中君山岛',
    fermentation: '10% ~ 20% 轻发酵（闷黄工艺）',
    pickingSeason: '清明前后采摘肥壮纯单芽',
    grade: '特级',
    coreFeatures: ['金镶玉', '三起三落', '黄汤黄叶', '甘醇回甘'],
    tasting: {
      shape: '芽头肥壮，挺直如针，金黄泛绿，白毫茸然包裹，俗称“金镶玉”',
      liquorColor: '杏黄明澈，清亮澄静',
      aroma: '清香纯正，甜香明显，带有独特的发酵烘焙米香',
      taste: '甘醇甜爽，初感清淡柔和，回味温润绵长，生津持久',
      leafBottom: '黄亮匀齐，芽体饱满挺直'
    },
    efficacy: ['健脾和胃', '促进消化', '生津止渴', '提神消食'],
    suitableFor: ['脾胃虚弱纳呆者', '经常腹胀食欲不振者', '雅趣赏茶茶客'],
    notSuitableFor: ['急性胃肠炎剧烈吐泻期'],
    notes: '玻璃杯冲泡时芽尖朝上悬空直立，沉沉浮浮，“三起三落”，宛如雨后春笋，为中国茶艺一大奇观。',
    history: {
      originStory: '湖南岳阳君山产茶自唐代已有记载。唐代文成公主出嫁西藏便带去君山茶。后列为历代贡茶。独特的“初包闷黄”与“复包焖黄”形成黄茶核心。',
      legend: '湘妃竹与君山银针：娥皇女英寻舜帝至君山，泪洒竹成斑，岛上灵气化生银针茶，采之贡奉天子。'
    },
    storage: {
      method: '避光、防潮、低温密封保存',
      shelfLife: '12-18个月',
      tips: ['防异味串味，防止过度氧化失去黄亮特色']
    },
    brewSummary: {
      temp: 88,
      ratio: '1:50',
      vessel: '透明无花纹直筒玻璃杯',
      time: '注水后静置2-3分钟，观赏三起三落奇景'
    },
    colorHex: '#A67C24'
  },
  {
    id: 'huoshan-huangya',
    name: '霍山黄芽',
    pinyin: 'Huò Shān Huáng Yá',
    category: 'yellow',
    categoryName: '黄茶',
    aliases: ['黄芽茶'],
    origin: '安徽省六安市霍山县大别山腹地金家店、大化坪',
    fermentation: '10% ~ 15% 微闷黄',
    pickingSeason: '春季清明谷雨采一芽一叶初展',
    grade: '特级、一级',
    coreFeatures: ['雀舌黄嫩', '微黄明亮', '熟栗香甜', '温润甘醇'],
    tasting: {
      shape: '形如雀舌，嫩黄微带翠绿，茸毫微露',
      liquorColor: '黄绿明亮，清澄透澈',
      aroma: '清芬高雅，带甜香与板栗香',
      taste: '甘醇甜润，柔滑爽适，回甘生津',
      leafBottom: '嫩黄明快，匀齐成朵'
    },
    efficacy: ['化湿消积', '舒缓胃肠', '生津止渴'],
    suitableFor: ['日常养胃护脾', '喜清柔醇和口感者'],
    notSuitableFor: ['热结便秘燥火极重者'],
    notes: '霍山黄芽在唐代即为贡茶，焖黄工序赋予了它与普通绿茶截然不同的温和不刺激特性。',
    history: {
      originStory: '西汉司马迁《史记》即有霍山产茶记载，唐代陆羽《茶经》推崇。明代列为御用贡茶。',
      legend: '淮南王刘安修道大别山，常以霍山黄芽泡山泉水炼丹品茗，赞为神仙草。'
    },
    storage: {
      method: '密封低温阴凉干燥',
      shelfLife: '12个月',
      tips: ['防潮密封，避免强光直射']
    },
    brewSummary: {
      temp: 85,
      ratio: '1:50',
      vessel: '玻璃杯或白瓷盖碗',
      time: '冲泡约1-2分钟'
    },
    colorHex: '#B28830'
  },

  // 6. 黑茶
  {
    id: 'puer-shengcha',
    name: '云南普洱生茶',
    pinyin: 'Yún Nán Pǔ Ěr Shēng Chá',
    category: 'dark',
    categoryName: '黑茶',
    aliases: ['滇青', '普洱生饼'],
    origin: '云南省西双版纳、临沧、普洱（思茅）核心大叶种茶区',
    fermentation: '自然后发酵（未渥堆发酵）',
    pickingSeason: '春茶一芽二三叶',
    grade: '古树茶、乔木大树、台地茶',
    coreFeatures: ['云南大叶种', '霸气回甘', '越陈越醇', '山野气韵'],
    tasting: {
      shape: '条索紧实粗壮，墨绿油亮，多白毫，饼面紧致匀称',
      liquorColor: '新茶黄绿金黄；陈年老茶转化为橙红、宝石红透亮',
      aroma: '新茶清香、蜜香、兰花香；陈茶显参香、樟香、陈木香',
      taste: '新茶茶气刚猛，入口微苦微涩但化甘迅猛如泉涌；老茶醇滑甘润、汤感稠厚',
      leafBottom: '大叶肥厚韧实，柔软舒展，活性十足'
    },
    efficacy: ['强效降脂降胆固醇', '生津提神', '促进肠胃蠕动', '消食醒酒'],
    suitableFor: ['重度茶友品饮', '长期藏茶投资', '大鱼大肉后消食刮油'],
    notSuitableFor: ['脾胃极其虚寒者不宜多饮新茶（刺激性强），老茶则无妨'],
    notes: '新普洱生茶茶性偏寒刺激，存放陈化数年乃至几十年后，微生物后发酵使得茶性转温，越陈越香。',
    history: {
      originStory: '茶马古道的核心物资，自唐宋代起源，明清达到鼎盛，马帮千里跋涉运输至西藏及东南亚，途中自然陈化形成独有滋味。',
      legend: '茶马古道传说：千百年来马帮铃响，茶农将大叶茶蒸压成紧压茶（饼、砖、沱），在崎岖马道与岁月发酵中成就绝世传奇。'
    },
    storage: {
      method: '常温避光通风无异味，适度湿度（湿度50%-75%，温度20-30℃最佳）',
      shelfLife: '长期陈放（数十年无保质期上限，前提是仓储得当未发霉）',
      tips: ['严禁放入冰箱或真空密封袋，普洱需要微量氧气自然陈化']
    },
    brewSummary: {
      temp: 98,
      ratio: '1:20（7-8克配150ml盖碗）',
      vessel: '紫砂壶（段泥/紫泥）或厚壁白瓷盖碗',
      time: '洗茶1次即倒，首泡5-10秒出汤，后期适当闷泡'
    },
    colorHex: '#4E4238'
  },
  {
    id: 'puer-shucha',
    name: '云南普洱熟茶',
    pinyin: 'Yún Nán Pǔ Ěr Shú Chá',
    category: 'dark',
    categoryName: '黑茶',
    aliases: ['渥堆普洱', '熟普'],
    origin: '云南昆明茶厂、勐海茶厂等传统核心工艺产地',
    fermentation: '100% 人工渥堆发酵（后发酵）',
    pickingSeason: '春茶/秋茶原料经分筛、渥堆',
    grade: '宫廷级、特级、一级至十级',
    coreFeatures: ['红浓明亮', '陈香独特', '醇厚顺滑', '温和养胃'],
    tasting: {
      shape: '条索紧结重实，色泽红褐显金毫，乌润油亮',
      liquorColor: '红浓透亮，如红酒玛瑙，陈年老茶泛红金圈',
      aroma: '独特渥堆陈香、木香、糯米香、枣香或药香，纯正无霉味',
      taste: '入口醇厚粘稠，顺滑如丝，无苦无涩，甜润绵软，温润入胃',
      leafBottom: '红褐柔嫩，富有弹性，色泽均匀无焦黑斑'
    },
    efficacy: ['温中暖胃', '降血压降血脂', '减肥通便', '帮助睡眠解酒安神'],
    suitableFor: ['中老年人', '经常胃寒胃痛胃胀者', '夜间饮茶人群', '控脂减脂群体'],
    notSuitableFor: ['便秘伴大热剧烈上火者少量饮用'],
    notes: '1973年昆明茶厂研制成功人工渥堆发酵技术，大大缩短了传统生普自然陈化几十年的等待时间。',
    history: {
      originStory: '1973年，云南省茶叶进出口公司组织技术骨干赴广州考察潮州茶发酵技术，回滇成功研发普洱熟茶人工渥堆发酵工艺，开启普洱熟茶新纪元。',
      legend: '勐海七子饼传奇：传统七子饼茶每筒七饼，寓意多子多福多财，是海外华人与东南亚茶庄至宝。'
    },
    storage: {
      method: '常温避光干燥通风无异味',
      shelfLife: '10-30年以上长期存放',
      tips: ['避开厨房油烟与香水等重气味，保持透气性']
    },
    brewSummary: {
      temp: 100,
      ratio: '1:20（7-8克配150ml壶）',
      vessel: '紫砂壶（紫泥、底槽清保温性好）或厚盖碗',
      time: '沸水润茶洗茶1-2道，每泡10秒出汤，极耐冲泡十余道'
    },
    colorHex: '#3D2F28'
  },
  {
    id: 'anhua-heicha',
    name: '安化黑茶',
    pinyin: 'Ān Huà Hēi Chá',
    category: 'dark',
    categoryName: '黑茶',
    aliases: ['千两茶', '金花茯砖'],
    origin: '湖南省益阳市安化县雪峰山脉资江流域',
    fermentation: '100% 后发酵（渥堆、松柴烘培、发花工艺）',
    pickingSeason: '春末夏初成熟鲜叶',
    grade: '茯砖茶、黑砖茶、花卷茶（千两茶）、天尖、贡尖',
    coreFeatures: ['金花璀璨（冠突散囊菌）', '松烟木香', '橙红透亮', '消食健胃'],
    tasting: {
      shape: '压制坚实规整，砖内密布金黄色菌落“金花”，黑褐油润',
      liquorColor: '橙黄透亮至橙红琥珀色，清澈不浑浊',
      aroma: '独特纯正“菌花香”与陈香，隐隐带松烟木质香',
      taste: '醇和甘甜，滑口回甘，菌香满口，消解油腻感立竿见影',
      leafBottom: '黑褐柔软，叶质较粗壮油润'
    },
    efficacy: ['降糖降三高', '消食去油解腻', '补充维生素与微量元素', '改善肠道菌群'],
    suitableFor: ['高脂饮食肉食主义者', '糖尿病代谢障碍人群', '肠道消化弱者'],
    notSuitableFor: ['无特殊禁忌，老少咸宜，适量常饮'],
    notes: '砖内“金花”（学名冠突散囊菌）是国家二级保密发花工艺，金花越茂盛，品质越优越甘甜。',
    history: {
      originStory: '古丝绸之路和西北茶马古道“官茶”，宋熙宁五年（1072年）已有安化黑茶记载，明清时期是朝廷控制西北边陲易马的重器。',
      legend: '世界茶王千两茶：千两花卷茶重约36.25公斤，用蓼叶、棕叶和竹篾纯人工踩制紧压，需数十名壮汉号子声中千锤百炼压制而成，号称“世界茶王”。'
    },
    storage: {
      method: '常温通风干燥避光',
      shelfLife: '越陈越醇，长期存放',
      tips: ['金花会随着时间缓慢陈化为白霜状，非霉变，实为岁月沉淀']
    },
    brewSummary: {
      temp: 100,
      ratio: '1:20',
      vessel: '粗陶壶、煮茶器或紫砂壶',
      time: '可冲泡亦极宜煮饮，加水煮沸3-5分钟后出汤'
    },
    colorHex: '#382B24'
  },
  {
    id: 'liubao-cha',
    name: '广西六堡茶',
    pinyin: 'Guǎng Xī Liù Bǎo Chá',
    category: 'dark',
    categoryName: '黑茶',
    aliases: ['黑石六堡', '侨销名茶'],
    origin: '广西壮族自治区梧州市苍梧县六堡镇',
    fermentation: '100% 后发酵（双蒸双发酵、陈化地窖藏）',
    pickingSeason: '春茶一芽二三叶',
    grade: '特级、一级、二级',
    coreFeatures: ['红浓陈醇', '槟榔香', '除湿消暑', '越陈越佳'],
    tasting: {
      shape: '条索紧结重实，色泽黑褐油润，紧压篓装或散茶',
      liquorColor: '红浓鲜艳，深红如琥珀，晶莹剔透',
      aroma: '独特陈香与高贵槟榔香，或带木香、参香，纯正持久',
      taste: '醇厚顺滑，甘甜爽口，微凉生津，滑入喉底非常舒服',
      leafBottom: '红褐软亮，匀齐明澈'
    },
    efficacy: ['祛湿解暑', '健胃消食', '通肠润便', '调节血脂'],
    suitableFor: ['岭南及潮湿南方多湿气人群', '长期吹空调体虚者', '海外侨胞传统茶饮'],
    notSuitableFor: ['孕妇空腹不宜大量浓饮'],
    notes: '六堡茶素有“红、浓、陈、醇”四绝，历史上有“茶船古道”沿西江远销南洋（马来西亚、印尼等国），是矿工解暑祛湿的救命神茶。',
    history: {
      originStory: '清嘉庆年间已位列中国名茶。19世纪南洋锡矿热潮中，数十万华工靠六堡茶抵抗热带瘴气湿毒，六堡茶伴随茶船古道走向世界。',
      legend: '南洋华工神水：南洋锡矿水土湿热，华工常腹胀水肿，唯饮苍梧六堡茶汤汗出湿除，矿主乃至按日配发六堡茶。'
    },
    storage: {
      method: '避光通风干燥防异味（宜竹篓装陈放）',
      shelfLife: '越陈越佳（二十年以上老六堡茶弥足珍贵）',
      tips: ['防潮防湿，保持通风呼吸环境']
    },
    brewSummary: {
      temp: 100,
      ratio: '1:20',
      vessel: '紫砂壶或保温随手煮茶壶',
      time: '沸水润茶洗茶一道，后续每泡10-15秒出汤'
    },
    colorHex: '#3F2C24'
  }
];
