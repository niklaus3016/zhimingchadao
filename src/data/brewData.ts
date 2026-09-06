import { TeaBrewGuide, BrewTroubleItem, TeaCategory } from '../types';

export const BREW_GUIDES: TeaBrewGuide[] = [
  {
    id: 'green-brew',
    teaName: '绿茶标准冲泡（以西湖龙井/碧螺春为例）',
    category: 'green',
    recommendedVessel: '透明直筒玻璃杯（高硼硅）或薄胎白瓷盖碗',
    waterType: '山泉水或纯净水（矿物质偏低为佳）',
    teaWeightGrams: 3,
    waterVolumeMl: 150,
    waterTemp: 85,
    washTea: false,
    washRounds: 0,
    washTeaTip: '高档细嫩绿茶无需洗茶，头道茶中茶氨酸与鲜嫩维生素最为丰富，洗茶会损失精华。',
    infusionTimesSec: [60, 90, 120, 150],
    tips: [
      '水温不可过高（80℃-85℃为宜），沸水先倒入公道杯冷却1-2分钟再注水',
      '龙井宜中投法（先注水1/3，投茶摇香，再注至七分满）',
      '碧螺春宜上投法（先注水七分满，再轻轻洒茶，观雪花飞落）',
      '切忌加盖闷泡，以免将嫩绿芽叶“焖熟变黄”，产生熟地瓜气'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '温杯洁具',
        subTitle: '提高器皿温度，唤醒杯壁洁净度',
        actionName: '温具',
        durationSec: 10,
        temperature: 90,
        technique: '以热水倾入玻璃杯或盖碗，轻轻转动摇晃使杯壁受热均匀，然后将水沥尽。',
        keyPoints: ['提升器皿温度避免骤降', '清洁并去除杯内残存异味'],
      },
      {
        stepNumber: 2,
        title: '投茶赏茶',
        subTitle: '量茶入器，观赏干茶条索',
        actionName: '投茶',
        durationSec: 8,
        temperature: 0,
        technique: '使用茶则取干茶3克，轻柔拨入温热的杯器中，可双手捧杯轻晃闻干茶香。',
        keyPoints: ['轻拿轻放勿压碎扁平芽叶', '借助杯壁余温烘出干茶兰豆香'],
      },
      {
        stepNumber: 3,
        title: '润茶浸润',
        subTitle: '初次注水唤醒茶性',
        actionName: '注水',
        durationSec: 15,
        temperature: 85,
        technique: '将85℃热水沿杯壁轻柔环绕注入约1/3杯满，手持杯底轻缓顺时针摇香10秒。',
        keyPoints: ['沿杯壁注水，严禁直冲茶心', '浸润干茶使叶片充分吸水苏醒'],
      },
      {
        stepNumber: 4,
        title: '续水七分',
        subTitle: '茶道七分满，留下三分情',
        actionName: '注水',
        durationSec: 10,
        temperature: 85,
        technique: '提壶高冲注水至杯身七分满，利用水流回旋带动茶叶翻滚起舞。',
        keyPoints: ['俗称“凤凰三点头”或回旋注水', '保持七分满，不烫手且符合中式茶礼'],
      },
      {
        stepNumber: 5,
        title: '静候品茗',
        subTitle: '观茶芽舒展，闻清气袭人',
        actionName: '分茶品茗',
        durationSec: 60,
        temperature: 65,
        technique: '静待茶芽如旗枪直立缓缓下沉，茶汤泛出鹅黄色即可举杯。端杯轻闻其香，三口细啜。',
        keyPoints: ['品饮留汤1/3，再行续水，保持前后滋味浓淡均衡'],
      }
    ]
  },
  {
    id: 'black-brew',
    teaName: '红茶标准功夫冲泡（以正山小种/金骏眉为例）',
    category: 'black',
    recommendedVessel: '白瓷盖碗（110ml-150ml）或紫砂朱泥西施壶',
    waterType: '天然弱碱性矿泉水或山泉水',
    teaWeightGrams: 5,
    waterVolumeMl: 120,
    waterTemp: 92,
    washTea: true,
    washRounds: 1,
    washTeaTip: '润茶（醒茶）快速出汤，5秒倒出不饮用，舒展紧结条索。',
    infusionTimesSec: [10, 15, 20, 25, 35, 45],
    tips: [
      '水温控制在90℃-92℃（金骏眉幼嫩芽尖90℃，粗壮传统小种93℃-95℃）',
      '前几泡必须快速出汤，切忌长久闷在盖碗中，否则汤色过深苦涩发酸',
      '使用细孔茶漏过滤碎毫，使红茶汤色如琥珀红宝、金圈明艳'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '洁具温润',
        subTitle: '热水温烫盖碗与公道杯',
        actionName: '温具',
        durationSec: 10,
        temperature: 95,
        technique: '沸水注入盖碗，顺次倒入公道杯与品茗杯，沥干，器皿温热有助于激发蜜香。',
        keyPoints: ['器暖生香，保持茶汤稳定温度'],
      },
      {
        stepNumber: 2,
        title: '投茶入器',
        subTitle: '茶水比1:25-1:30',
        actionName: '投茶',
        durationSec: 5,
        temperature: 0,
        technique: '将5克红茶置于茶荷，倾入盖碗中，合上碗盖轻摇，启盖闻干茶焦糖甜香。',
        keyPoints: ['条索轻柔入碗，勿压碎'],
      },
      {
        stepNumber: 3,
        title: '醒茶润泡',
        subTitle: '快速激发茶性与芳香',
        actionName: '润茶/洗茶',
        durationSec: 8,
        temperature: 92,
        technique: '沿盖碗边缘定点定流注水，合盖后3-5秒即刻倒出茶汤作为润茶水，唤醒条索。',
        keyPoints: ['即冲即出，不可停留拖延'],
      },
      {
        stepNumber: 4,
        title: '高冲定点注水',
        subTitle: '激发花果蜜糖芳香',
        actionName: '注水',
        durationSec: 8,
        temperature: 92,
        technique: '悬壶高冲，沿碗壁定点注水满至九分，水流激荡出金黄红润香气。',
        keyPoints: ['水线顺畅，避免直击叶底破坏柔顺'],
      },
      {
        stepNumber: 5,
        title: '出汤入海',
        subTitle: '沥尽每一滴茶汤',
        actionName: '出汤',
        durationSec: 10,
        temperature: 90,
        technique: '食指按住盖纽，拇指中指扣住碗沿，倾斜盖碗将茶汤经茶滤倒入公道杯，务必沥干。',
        keyPoints: ['碗内不留残水，防止下一泡闷苦'],
      },
      {
        stepNumber: 6,
        title: '分杯敬客',
        subTitle: '均分茶汤，奉客品味',
        actionName: '分茶品茗',
        durationSec: 15,
        temperature: 65,
        technique: '公道杯巡回注入各品茗杯至七分满，敬奉茶客，观金圈、品甘甜。',
        keyPoints: ['关公巡城、韩信点兵，确保各杯汤色浓度一致'],
      }
    ]
  },
  {
    id: 'oolong-brew',
    teaName: '乌龙茶功夫泡法（以大红袍/铁观音/单丛为例）',
    category: 'oolong',
    recommendedVessel: '朱泥/紫泥小紫砂壶或薄胎白瓷盖碗（100ml-120ml）',
    waterType: '初沸山泉水（100℃沸水）',
    teaWeightGrams: 8,
    waterVolumeMl: 120,
    waterTemp: 100,
    washTea: true,
    washRounds: 1,
    washTeaTip: '必须洗茶1道（5秒内迅速出汤），冲去表面微尘并彻底舒展紧结的岩茶/球形茶体。',
    infusionTimesSec: [8, 12, 18, 25, 35, 50, 70],
    tips: [
      '“乌龙茶最重火候”，非沸水不可激发出高昂岩韵与花香，水温务必保持98℃-100℃',
      '投茶量较大（通常铺满壶底1/2至2/3），因此前三泡出汤要疾如闪电（5-8秒即倒出）',
      '淋壶加温：冲泡中盖上壶盖后，以沸水浇淋壶身（俗称淋盖），聚热逼香'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '重汤烫壶',
        subTitle: '高温激发紫砂透气热力',
        actionName: '温具',
        durationSec: 12,
        temperature: 100,
        technique: '将沸水灌满紫砂壶及公道杯，烫热所有器皿，倒尽后趁热投茶。',
        keyPoints: ['热壶是岩茶逼出岩骨花香的关键'],
      },
      {
        stepNumber: 2,
        title: '纳茶入壶',
        subTitle: '茶占壶容积之半',
        actionName: '投茶',
        durationSec: 6,
        temperature: 0,
        technique: '大红袍条索或铁观音颗粒倾入壶中，约占壶容量二分之一至三分之二。',
        keyPoints: ['碎茶放中间，粗条放上面和壶嘴处防堵'],
      },
      {
        stepNumber: 3,
        title: '润茶洗尘',
        subTitle: '醒茶展叶，弃而不饮',
        actionName: '润茶/洗茶',
        durationSec: 5,
        temperature: 100,
        technique: '高冲沸水满溢，用壶盖刮去水面浮沫，迅速倾尽倒出（3-5秒内）。',
        keyPoints: ['俗称“刮沫淋盖”，出汤快如白驹过隙'],
      },
      {
        stepNumber: 4,
        title: '高冲激荡',
        subTitle: '悬壶高冲，激荡内质',
        actionName: '注水',
        durationSec: 8,
        temperature: 100,
        technique: '高提水壶，水线沿壶内壁猛烈回旋冲入，满盖后随即盖上，沸水浇淋壶盖。',
        keyPoints: ['外淋内烘，锁住深层岩韵'],
      },
      {
        stepNumber: 5,
        title: '低斟出汤',
        subTitle: '香气不散，汤不翻花',
        actionName: '出汤',
        durationSec: 10,
        temperature: 95,
        technique: '壶嘴紧贴公道杯口低斟，沥干最后一滴茶汤（“韩信点兵”），使内质完全释放。',
        keyPoints: ['高冲低斟，防香气挥散与溅沫'],
      }
    ]
  },
  {
    id: 'white-brew',
    teaName: '白茶盖碗泡法与老白茶煮法（以白毫银针/寿眉为例）',
    category: 'white',
    recommendedVessel: '大口白瓷盖碗（银针牡丹）或提梁玻璃/陶煮茶器（老白茶）',
    waterType: '纯净水或优质山泉水',
    teaWeightGrams: 5,
    waterVolumeMl: 150,
    waterTemp: 90,
    washTea: false,
    washRounds: 0,
    washTeaTip: '新白茶（银针牡丹）无需洗茶；陈年紧压老白茶砖/饼可轻柔快速洗茶一道。',
    infusionTimesSec: [20, 30, 45, 60, 80, 100],
    tips: [
      '新白茶嫩芽宜90℃轻柔浸润，不宜死闷',
      '三年以上陈化老寿眉极宜煮饮：盖碗冲泡5道后，转入煮茶壶，小火慢煨3-5分钟，枣香药香喷薄而出',
      '煮茶时水添八分满，小火慢煮，汤如琥珀红亮'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '温具净器',
        subTitle: '温热盖碗与品茗杯',
        actionName: '温具',
        durationSec: 10,
        temperature: 90,
        technique: '热水冲淋白瓷盖碗，温热后倒出。',
        keyPoints: ['大口径盖碗利于白茶散热不闷熟'],
      },
      {
        stepNumber: 2,
        title: '轻置白羽',
        subTitle: '蓬松茶叶轻放入碗',
        actionName: '投茶',
        durationSec: 6,
        temperature: 0,
        technique: '白茶干茶蓬松如落叶，轻取5克入碗，不可用力挤压折断芽针。',
        keyPoints: ['保持芽针与叶形完整自然舒展'],
      },
      {
        stepNumber: 3,
        title: '环壁柔注',
        subTitle: '温和润泽，激荡毫香',
        actionName: '注水',
        durationSec: 12,
        temperature: 90,
        technique: '定点环壁细水流慢慢注入，让水漫过茶叶，避免水柱猛冲芽头击落白毫。',
        keyPoints: ['温柔注水，白毫浸入汤中形成碎金银光'],
      },
      {
        stepNumber: 4,
        title: '出汤鉴赏',
        subTitle: '清甜如蜜，汤感细腻',
        actionName: '出汤',
        durationSec: 25,
        temperature: 85,
        technique: '静待20-30秒后出汤入公道杯，汤色杏黄莹澈，品啜清甜甘美之毫香蜜韵。',
        keyPoints: ['清润甘甜，喉韵开朗'],
      }
    ]
  },
  {
    id: 'dark-brew',
    teaName: '黑茶功夫泡与煮茶法（以普洱熟茶/安化黑茶为例）',
    category: 'dark',
    recommendedVessel: '厚壁紫砂壶（紫泥/段泥）或土陶煮茶罐',
    waterType: '初沸山泉水（100℃滚开沸水）',
    teaWeightGrams: 8,
    waterVolumeMl: 150,
    waterTemp: 100,
    washTea: true,
    washRounds: 2,
    washTeaTip: '紧压黑茶和陈年普洱建议洗茶2次（每次5秒迅速出汤倒弃），洗去仓储微尘并唤醒陈香。',
    infusionTimesSec: [10, 15, 20, 25, 35, 50, 70, 90],
    tips: [
      '用茶刀/茶针沿饼砖纹理顺向撬茶，尽量保持叶片完整',
      '醒茶：压制紧茶撬开后，宜放入陶罐内常温“醒茶”1-2周，褪去仓气风味更醇',
      '黑茶极其耐泡，冲泡十几道后仍有甜韵，后段可转入煮茶壶慢煮5分钟饮用'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '高温炙具',
        subTitle: '厚壁紫砂聚热蓄能',
        actionName: '温具',
        durationSec: 12,
        temperature: 100,
        technique: '滚水浇透紫砂壶内外，使壶体达到高热状态。',
        keyPoints: ['黑茶需要持久高热逼发陈香与醇厚'],
      },
      {
        stepNumber: 2,
        title: '置入陈茶',
        subTitle: '茶量约8克',
        actionName: '投茶',
        durationSec: 6,
        temperature: 0,
        technique: '将撬散适度的黑茶投入壶中，加盖借余温轻嗅陈香。',
        keyPoints: ['松散块状均匀放置'],
      },
      {
        stepNumber: 3,
        title: '双洗润茶',
        subTitle: '两次快速冲洗，唤醒内质',
        actionName: '润茶/洗茶',
        durationSec: 15,
        temperature: 100,
        technique: '注入沸水满壶，快速倒出第一道水；再次注水5秒迅速倒出，完成醒茶。',
        keyPoints: ['彻底冲去浮尘，使紧压叶块舒展'],
      },
      {
        stepNumber: 4,
        title: '沸水高冲',
        subTitle: '激荡陈醇，汤若玛瑙',
        actionName: '注水',
        durationSec: 10,
        temperature: 100,
        technique: '以100℃开水定点冲入，加盖后再次浇淋壶面，聚热发香。',
        keyPoints: ['保持高温水沸状态'],
      },
      {
        stepNumber: 5,
        title: '倾出红浓',
        subTitle: '滑糯稠厚，温润入脾',
        actionName: '出汤',
        durationSec: 12,
        temperature: 95,
        technique: '滤入公道杯，汤色红浓透亮如陈年红酒，分入小杯趁热品饮，温润绵长。',
        keyPoints: ['顺滑无涩，甜润绵软'],
      }
    ]
  },
  {
    id: 'yellow-brew',
    teaName: '黄茶标准冲泡（以君山银针/蒙顶黄芽/霍山黄芽为例）',
    category: 'yellow',
    recommendedVessel: '透明直筒玻璃杯（高硼硅）或薄胎白瓷盖碗',
    waterType: '山泉水或纯净水（矿物质偏低为佳）',
    teaWeightGrams: 3,
    waterVolumeMl: 150,
    waterTemp: 85,
    washTea: false,
    washRounds: 0,
    washTeaTip: '黄茶芽叶细嫩、经“闷黄”工艺转化，无需洗茶，头泡甜醇鲜爽物质最为丰富。',
    infusionTimesSec: [60, 90, 120, 150],
    tips: [
      '水温严格控制在80℃-85℃，切忌沸水直冲，否则嫩芽烫熟、甜醇尽失',
      '宜用中投法：先注水至杯身1/3浸润芽尖，待芽头舒展后再注至七分满',
      '君山银针冲泡后可见“三起三落”奇观，宜用透明玻璃杯静赏',
      '黄茶“闷黄”工艺使其比绿茶少寒多醇，忌加盖久焖，玻璃杯敞口或盖碗敞盖冲泡为宜',
      '前两泡甜醇鲜爽，三泡后可适当延长浸泡时间至2分钟'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '温杯洁具',
        subTitle: '85℃热水温透杯壁',
        actionName: '温具',
        durationSec: 10,
        temperature: 85,
        technique: '以热水回旋烫洗玻璃杯内外，提升杯温后倒尽残水。',
        keyPoints: ['杯温均匀，避免冷杯激烫嫩芽'],
      },
      {
        stepNumber: 2,
        title: '投茶观形',
        subTitle: '干茶约3克，金毫显露',
        actionName: '投茶',
        durationSec: 5,
        temperature: 0,
        technique: '将3克黄芽轻拨入杯，借余温可轻嗅干茶清甜的嫩玉米香。',
        keyPoints: ['芽头肥壮、金黄显毫者为佳'],
      },
      {
        stepNumber: 3,
        title: '中投润茶',
        subTitle: '先注1/3水温润芽尖',
        actionName: '注水',
        durationSec: 8,
        temperature: 85,
        technique: '将85℃热水沿杯壁缓缓注入杯身1/3处，静待20秒让紧结芽头充分浸润舒展。',
        keyPoints: ['不可沸水直冲，避免芽头烫熟'],
      },
      {
        stepNumber: 4,
        title: '高冲注满',
        subTitle: '七分满，静待三起三落',
        actionName: '注水',
        durationSec: 10,
        temperature: 85,
        technique: '再以细流高冲注水至七分满，可见芽尖随水流上下沉浮、竖立杯中，三起三落。',
        keyPoints: ['注水后敞盖静置约1分钟，切勿加盖闷泡'],
      },
      {
        stepNumber: 5,
        title: '品饮甜醇',
        subTitle: '汤黄明亮，嫩甜回甘',
        actionName: '出汤',
        durationSec: 8,
        temperature: 80,
        technique: '待芽尖徐徐沉底、汤色嫩黄明亮即可品饮；小口慢啜，甜醇鲜爽、回甘持久。',
        keyPoints: ['留1/3茶汤续水，二泡三泡滋味递增'],
      }
    ]
  }
];

export const BREW_TROUBLE_LIBRARY: BrewTroubleItem[] = [
  {
    id: 'err-1',
    problem: '茶汤苦涩难咽、发麻发紧',
    cause: '1. 水温过高（如用100℃沸水直冲绿茶或娇嫩白茶）；2. 出汤时间过久，在盖碗或壶中长时间“死闷”；3. 投茶量过大，超出合理茶水比。',
    solution: '绿茶/细嫩红茶水温降至80℃-85℃；前三泡出汤务必快速（5-10秒内倒尽）；严格按照1:50（绿茶）或1:25（功夫茶）标准控制投茶克数。',
    relatedTeas: ['绿茶', '红茶', '黄茶'],
    tag: '苦涩闷汤'
  },
  {
    id: 'err-2',
    problem: '茶汤水味重、滋味寡淡无香',
    cause: '1. 投茶量过少；2. 水温不足（如冲泡岩茶、黑茶用了温开水或降温水）；3. 注水过急冲翻叶底，未充分激发出内含物质。',
    solution: '乌龙茶、黑茶必须使用100℃初沸滚水；按茶器容量精准称量茶叶（100ml盖碗投茶7-8克）；冲泡时采用定点细水流或平缓回旋注水。',
    relatedTeas: ['乌龙茶', '黑茶'],
    tag: '滋味淡薄'
  },
  {
    id: 'err-3',
    problem: '茶叶烫出“熟地瓜味”或青草气，芽叶发黄',
    cause: '绿茶冲泡时盖上了杯盖或密闭保温杯长久焖泡，叶绿素受热破坏变性，维生素C氧化。',
    solution: '细嫩名优绿茶一律严禁加盖闷泡！使用敞口透明玻璃杯或敞盖白瓷盖碗；随时留汤续水，保持叶片鲜活翠绿。',
    relatedTeas: ['西湖龙井', '碧螺春', '信阳毛尖', '安吉白茶'],
    tag: '焖熟变黄'
  },
  {
    id: 'err-4',
    problem: '茶汤浑浊不清澈、漂浮碎末絮状物',
    cause: '1. 撬茶时将紧压茶撬得太碎；2. 倒汤时未使用滤网或滤网孔径过大；3. 暴力注水直击干茶表面砸碎芽叶；4. 某些多毫茶叶（碧螺春、白毫银针）的正常茸毫，被误当成浑浊。',
    solution: '撬茶顺纹理轻挑大叶片；注水沿碗壁缓缓注入；搭配300目以上超细不锈钢或陶瓷茶漏；细嫩芽茶汤中轻微银毫浮游乃品质象征，静置沉淀后澄澈即属正常。',
    relatedTeas: ['碧螺春', '白毫银针', '普洱生茶'],
    tag: '茶汤混浊'
  },
  {
    id: 'err-5',
    problem: '洗茶不当导致头道好茶营养流失或杂味未除',
    cause: '绿茶盲目洗茶将最鲜嫩的茶氨酸倒掉；或者黑茶老白茶洗茶水温不够、时间拖延使杂味渗入茶汤。',
    solution: '牢记口诀：优质绿茶白茶单芽不洗茶；乌龙茶沸水快洗（3秒倒尽）；紧压陈年黑茶双洗（沸水冲淋5秒倒出）。',
    relatedTeas: ['全茶类'],
    tag: '洗茶不当'
  },
  {
    id: 'err-6',
    problem: '茶香不扬、闻之寡淡无味',
    cause: '1. 器具未预热（冷杯冰盖碗吸走热量）；2. 茶叶受潮跑气或存放不当吸附异味；3. 水质硬度过高（碱性硬水会极度压抑茶香）。',
    solution: '冲泡前务必用沸水彻底温烫盖碗或紫砂壶；选用低硬度的天然山泉水或纯净水；避光密封干燥保存茶叶。',
    relatedTeas: ['红茶', '乌龙茶', '花果香型茶'],
    tag: '香气不显'
  }
];

// Helper calculation function for the Calculator tool
export function calculateBrewParams(
  category: TeaCategory,
  vesselVolumeMl: number,
  drinkerCount: number
): {
  recommendedGrams: number;
  waterTemp: number;
  washRounds: number;
  infusionTable: { round: number; seconds: number; note: string }[];
  ratioText: string;
  drinkerAdvice: string;
} {
  let ratio = 50; // default 1:50
  let temp = 85;
  let wash = 0;
  let baseTimes = [60, 80, 100, 130];

  switch (category) {
    case 'green':
      ratio = 50;
      temp = 85;
      wash = 0;
      baseTimes = [50, 75, 100, 130];
      break;
    case 'black':
      ratio = 28;
      temp = 92;
      wash = 1;
      baseTimes = [10, 15, 20, 30, 45, 60];
      break;
    case 'oolong':
      ratio = 18;
      temp = 100;
      wash = 1;
      baseTimes = [8, 12, 18, 25, 35, 50, 70];
      break;
    case 'white':
      ratio = 30;
      temp = 90;
      wash = 0;
      baseTimes = [20, 30, 45, 65, 90, 120];
      break;
    case 'yellow':
      ratio = 45;
      temp = 88;
      wash = 0;
      baseTimes = [60, 90, 120, 150];
      break;
    case 'dark':
      ratio = 20;
      temp = 100;
      wash = 2;
      baseTimes = [10, 15, 20, 30, 45, 65, 90];
      break;
  }

  // Calculate grams from vessel volume
  let grams = Math.round((vesselVolumeMl / ratio) * 10) / 10;
  if (grams < 2) grams = 2;
  if (grams > 15) grams = 15;

  // 品茗人数决定建议器皿容量与冲泡组织方式
  let drinkerAdvice: string;
  if (drinkerCount <= 2) {
    drinkerAdvice = '1-2人独酌小聚：100-120ml 小盖碗或小品壶即可，一泡分尽，不留余汤';
  } else if (drinkerCount <= 4) {
    drinkerAdvice = '3-4人品饮：建议 150ml 标准盖碗或紫砂壶，每泡可分 4-5 小杯，趁热奉茶';
  } else {
    drinkerAdvice = '5人以上茶会：建议 200ml 以上大盖碗/大壶，或双器同泡；注意缩短出汤间隔，避免后泡客人等汤';
  }

  const notes = [
    '第1泡：唤醒内质，初尝鲜爽与头香',
    '第2泡：内含物质释放峰值，滋味最饱满',
    '第3泡：香气与回甘达到黄金平衡',
    '第4泡：甜韵尽显，汤感醇润顺滑',
    '第5泡：木质与果蜜底香，需适度延长浸润',
    '第6泡：清甘余韵，宜慢饮细啜'
  ];

  const infusionTable = baseTimes.map((sec, idx) => ({
    round: idx + 1,
    seconds: sec,
    note: notes[idx] || `第${idx + 1}泡：醇厚甜韵，适度闷泡`
  }));

  return {
    recommendedGrams: grams,
    waterTemp: temp,
    washRounds: wash,
    infusionTable,
    ratioText: `1 : ${ratio}`,
    drinkerAdvice
  };
}
