import React from 'react';

/**
 * 《用户服务协议》与《隐私政策》统一全文组件。
 * 启动同意弹窗与「我的-隐私政策」共用，保持单一事实来源。
 * 主体：深圳丰佰瑞网络科技有限公司 · 联系邮箱：Jp182025@163.com
 */

const H2: React.FC<{ children: React.ReactNode; accent?: 'green' | 'amber' }> = ({
  children,
  accent = 'green'
}) => (
  <h3
    className={`text-xs font-bold text-white border-l-2 pl-2 mt-4 first:mt-0 ${
      accent === 'amber' ? 'border-[#F4A261]' : 'border-[#52C997]'
    }`}
  >
    {children}
  </h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[#CBE0D6] leading-relaxed mt-1.5">{children}</p>
);

// ============================================================
// 隐私政策
// ============================================================
export const PrivacyPolicyContent: React.FC = () => (
  <div className="text-xs text-[#CBE0D6] leading-relaxed space-y-2">
    <div className="text-center pb-1">
      <h2 className="text-base font-bold text-[#52C997]">隐私政策</h2>
      <p className="text-[10px] text-[#AEC0B7] mt-1">生效日期：2026年9月6日</p>
    </div>

    <div className="p-3 rounded-xl bg-[#1A2E26] border-l-4 border-[#52C997] text-[#E2E9E5]">
      欢迎使用「知茗茶道」（以下简称"本应用"）。本应用由<strong className="text-white">深圳丰佰瑞网络科技有限公司</strong>（以下简称"我们"）开发并运营。我们深知个人信息对您的重要性，严格遵守《中华人民共和国个人信息保护法》《中华人民共和国网络安全法》等法律法规，保护您的个人信息安全。
    </div>

    <P>
      本应用是一款纯本地离线的茶文化工具应用。本政策旨在说明我们如何处理您在使用本应用过程中产生的信息，以及您享有的权利。请您在使用前仔细阅读，尤其是<strong className="text-white">加粗条款</strong>。
    </P>

    <H2>一、我们收集的信息</H2>
    <P>
      1. <strong className="text-white">无需账号、不采集个人身份信息</strong>：本应用不提供账号注册或第三方登录，我们绝不收集您的姓名、手机号码、身份证号、位置信息、通讯录，亦不采集设备标识符（如 IMEI、Android ID）或 IP 地址。
    </P>
    <P>
      2. <strong className="text-white">纯设备本地存储</strong>：您在使用中自主产生的"收藏""品茶日记""浏览足迹""每日打卡""个性设置"等茶事数据，均仅存储于您设备本地的浏览器存储空间（LocalStorage）中，不向任何服务器上传。
    </P>

    <H2>二、我们如何使用信息</H2>
    <P>本地茶事数据仅在本机范围内用于为您呈现收藏列表、浏览足迹、品茶日记、打卡统计与个性化显示设置，我们无法访问这些数据，也不会将其用于任何其他目的。</P>

    <H2>三、设备权限使用说明</H2>
    <P>
      1. <strong className="text-white">网络（INTERNET）</strong>：仅用于启动时加载思源宋体等在线字体资源；字体加载失败不影响任何功能，本应用可完全离线使用。
    </P>
    <P>
      2. <strong className="text-white">振动（VIBRATE）</strong>：用于交互时的轻微触感反馈，您可在「我的-个性设置」中随时关闭。
    </P>
    <P>
      3. 本应用<strong className="text-white">不申请</strong>相机、麦克风、精确位置、通讯录、相册读取等任何非必要权限；剪贴板仅在您主动点击"分享/复制"时写入公开茶道文字，绝不读取您的剪贴板。
    </P>

    <H2>四、信息共享、转让与公开披露</H2>
    <P>
      本应用未嵌入任何广告、统计或推送类第三方 SDK，我们不会与任何第三方共享、出售或公开披露您的信息；仅根据法律法规或司法、行政机关的强制性要求，可能依法向有权机关提供。
    </P>

    <H2>五、存储地点、期限与保护</H2>
    <P>您的全部数据存储于您本人的设备本地，不存在服务器存储。卸载本应用或清除应用数据后，本地数据即被彻底删除且无法恢复。我们建议您为设备设置锁屏密码，以保护本地数据安全。</P>

    <H2>六、您的权利</H2>
    <P>您对设备上的全部茶事记录享有完全控制权：可随时在应用内查看、修改、删除单条日记或收藏；亦可在「我的-个性设置」中一键清空全部本地存储数据。</P>

    <H2>七、未成年人保护</H2>
    <P>本应用不收集任何个人信息。未满 14 周岁的未成年人应在监护人指导下使用本应用。</P>

    <H2>八、政策更新与联系我们</H2>
    <P>我们可能适时修订本政策，修订后将在应用内公示；如变更影响您的重大权益，将在您下次启动应用时重新征得您的同意。</P>
    <P>如您对本政策有任何疑问、意见或建议，可通过以下方式联系我们：</P>
    <div className="p-3 rounded-xl bg-[#13221C] border border-[#273F33] mt-1.5">
      <P>
        <strong className="text-white">电子邮箱</strong>：Jp182025@163.com
      </P>
      <P>
        <strong className="text-white">运营主体</strong>：深圳丰佰瑞网络科技有限公司
      </P>
    </div>

    <div className="text-center pt-4 pb-1 space-y-1">
      <p className="text-[#AEC0B7]">感谢您使用知茗茶道！</p>
      <p className="text-[10px] text-[#7A8F85]">© 2026 深圳丰佰瑞网络科技有限公司 版权所有</p>
    </div>
  </div>
);

// ============================================================
// 用户服务协议
// ============================================================
export const UserAgreementContent: React.FC = () => (
  <div className="text-xs text-[#CBE0D6] leading-relaxed space-y-2">
    <div className="text-center pb-1">
      <h2 className="text-base font-bold text-[#52C997]">用户服务协议</h2>
      <p className="text-[10px] text-[#AEC0B7] mt-1">生效日期：2026年9月6日</p>
    </div>

    <H2 accent="amber">一、协议的接受</H2>
    <P>欢迎使用「知茗茶道」应用（以下简称"本应用"）。</P>
    <P>本协议是您与<strong className="text-white">深圳丰佰瑞网络科技有限公司</strong>（以下简称"我们"）之间关于使用本应用的法律协议。</P>
    <P>您点击"同意并继续"，或实际下载、安装、使用本应用，即表示您已阅读并同意接受本协议与《隐私政策》的全部条款。</P>

    <H2>二、服务内容</H2>
    <P>本应用为您提供以下纯本地离线服务：</P>
    <ul className="list-disc pl-5 space-y-1 mt-1 marker:text-[#52C997]">
      <li>六大茶类名茶档案与茶文化知识查阅；</li>
      <li>功夫茶冲泡分步演示、冲泡计时与参数换算；</li>
      <li>茶具图鉴、茶器适配与养护指引；</li>
      <li>品茶日记、收藏、浏览足迹与每日打卡等本地记录工具。</li>
    </ul>

    <H2 accent="amber">三、用户义务</H2>
    <ul className="list-disc pl-5 space-y-1 mt-1 marker:text-[#52C997]">
      <li>遵守本协议及法律法规，不利用本应用从事任何违法活动；</li>
      <li>不复制、篡改、逆向工程或干扰本应用的正常运行；</li>
      <li>妥善保管您的设备，防止本地茶事数据被他人未经授权查看或删除。</li>
    </ul>

    <H2>四、知识产权</H2>
    <P>本应用内的茶文化文案、界面设计、图标、代码等全部内容，均受知识产权法律保护，归我们或相应权利人所有。未经书面许可，您不得复制、修改、分发或将其用于商业用途；茶文化知识内容仅供您个人学习欣赏。</P>

    <H2 accent="amber">五、免责声明</H2>
    <P>
      1. 本应用按"原样"提供，不作任何形式的保证，不保证应用不中断、无错误，亦不保证因使用本应用而产生的任何结果准确可靠。
    </P>
    <P>
      2. <strong className="text-white">本应用内的茶性、功效、禁忌等内容仅为传统茶文化科普，不构成任何医疗建议或诊断依据。</strong>孕期、哺乳期、慢性疾病或正在服药等特殊人群，饮茶前请遵医嘱。
    </P>
    <P>3. 冲泡计时、水温与投茶量参数仅为通用参考值，请结合实际情况和个人口味调整。</P>

    <H2>六、协议的变更与终止</H2>
    <P>我们可能适时修订本协议，修订后将通过应用内公示；若您继续使用即视为接受修订。您可随时停止使用本应用；如修订内容您无法接受，请停止使用。</P>

    <H2 accent="amber">七、适用法律与争议解决</H2>
    <P>本协议受中华人民共和国法律管辖。任何与本协议相关的争议，应先友好协商解决；协商不成的，提交深圳市有管辖权的人民法院诉讼解决。</P>

    <div className="text-center pt-4 pb-1">
      <p className="text-[10px] text-[#7A8F85]">© 2026 深圳丰佰瑞网络科技有限公司 版权所有</p>
    </div>
  </div>
);
