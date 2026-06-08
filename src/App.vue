<script setup>
import { computed, reactive, ref, onMounted, watch } from 'vue'
import LoginHome from './components/LoginHome.vue'
import HeroSection from './components/HeroSection.vue'
import ChapterNavigation from './components/ChapterNavigation.vue'
import ChapterPanel from './components/ChapterPanel.vue'
import SystemQuiz from './components/SystemQuiz.vue'
import BiasExplorer from './components/BiasExplorer.vue'
import ShoppingSimulator from './components/ShoppingSimulator.vue'
import ScenarioQuiz from './components/ScenarioQuiz.vue'
import MemoryChallenge from './components/MemoryChallenge.vue'
import EmotionDecision from './components/EmotionDecision.vue'
import DecisionToolkit from './components/DecisionToolkit.vue'
import PsychologyLab from './components/PsychologyLab.vue'
import TheoryExplainer from './components/TheoryExplainer.vue'
import ChapterQuiz from './components/ChapterQuiz.vue'
import FullPageQuiz from './components/FullPageQuiz.vue'
import IllusionDemo from './components/IllusionDemo.vue'
import GestaltDemo from './components/GestaltDemo.vue'
import MemoryPipeline from './components/MemoryPipeline.vue'
import MisinformationDemo from './components/MisinformationDemo.vue'
import SocialMediaDemo from './components/SocialMediaDemo.vue'
import ConspiracyDemo from './components/ConspiracyDemo.vue'
import FakeNewsDemo from './components/FakeNewsDemo.vue'
import ThinkingMapReport from './components/ThinkingMapReport.vue'
// 🚧 預留：期末專題新互動組件
// import StroopDemo from './components/StroopDemo.vue'
// import DefaultEffectDemo from './components/DefaultEffectDemo.vue'
// import DecoyDemo from './components/DecoyDemo.vue'
// import BrainMapDemo from './components/BrainMapDemo.vue'
// import RadarQuizDemo from './components/RadarQuizDemo.vue'
// import ParallaxStoryDemo from './components/ParallaxStoryDemo.vue'
// import FinalEndingDemo from './components/FinalEndingDemo.vue'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrWVHoH3iTzjhyMWiZiHZH9dnFzyjSf_eQRYexV5eGGVEGbWi7Q_PHBoYM-ODBk_V4HQ/exec'

const activeChapter = ref(0)
const learner = ref(null)
const interactionDone = reactive({})
const chapterScores = reactive({})
const userSignals = reactive({
  perception: 0,
  memory: 0,
  emotion: 0,
  intuitive: 0,
  rational: 0,
  social: 0,
  confirmation: 0,
  scarcity: 0,
  sunkCost: 0,
  misinformation: 0,
})

const chapters = [
  {
    title: '你看到的不一定是真的',
    kicker: '第一章｜知覺心理學',
    activity: 'illusion',
    intro: '視覺不是單純接收世界，而是大腦根據光線、經驗與預期，主動「建構」的詮釋過程。',
    points: ['視覺錯覺', '知覺組織', '由上而下處理 (Top-down Processing)'],
    theory: [
      '我們常以為眼睛像相機，客觀紀錄一切；但知覺其實更像大腦的推論。眼睛只接收光線（由下而上處理），大腦會根據既有經驗、背景對比與期待（由上而下處理），把刺激整理成有意義的畫面。',
      '視覺錯覺之所以重要，是因為它讓我們看見「大腦推論的潛規則」。當這些自動化規則在特殊情境中產生矛盾，我們就會看見與客觀事實不符的幻象。',
      '核心問題並非「眼睛有沒有看見」，而是「大腦如何解釋這些訊號」。我們體驗到的現實，本質上是大腦模擬出來的虛擬實境。',
    ],
    questions: [
      { question: '大腦根據過往經驗與期待來詮釋視覺刺激，心理學稱之為？', options: ['由上而下處理', '由下而上處理', '無意識處理'], answer: '由上而下處理' },
      { question: '視覺錯覺能幫助我們理解什麼？', options: ['大腦建構資訊的潛規則', '眼睛感光細胞的死亡', '人類不需要經驗'], answer: '大腦建構資訊的潛規則' },
      { question: '知覺最接近哪一種過程？', options: ['大腦主動建構現實', '相機單純錄影', '完全隨機猜測'], answer: '大腦主動建構現實' },
    ],
  },
  {
    title: '大腦如何理解資訊',
    kicker: '第二章｜完形心理學',
    activity: 'gestalt',
    intro: '大腦會自動在混亂中尋找秩序，將零散刺激組織成具備意義的整體圖形。',
    points: ['接近律', '相似律', '閉合律', '整體大於部分總和'],
    theory: [
      '完形心理學 (Gestalt Psychology) 認為「整體大於部分的總和」。人不會先看見一堆零碎像素再拼湊；大腦總是優先捕捉「整體結構」。',
      '「接近律」讓距離近的元素被看成同一群；「相似律」將外觀相近的歸類；「閉合律」讓大腦自動補足缺失邊緣；「連續律」讓我們偏好平滑連續的路徑。',
      '這反映了大腦極度渴望「秩序」。現代 Logo、網頁排版 (UI/UX) 與廣告設計，都大量利用大腦內建的組織原則，讓觀眾一秒抓到重點。',
    ],
    questions: [
      { question: '完形心理學最核心的主張是？', options: ['整體大於部分的總和', '人類沒有視覺盲點', '記憶可以被消除'], answer: '整體大於部分的總和' },
      { question: '大腦會自動把斷斷續續的線條看成一個完整的圓，是哪種法則？', options: ['閉合律', '錨定效應', '旁觀者效應'], answer: '閉合律' },
      { question: '設計師把相關按鈕排得很近，主要是利用大腦的？', options: ['接近律', '相似律', '沉沒成本'], answer: '接近律' },
    ],
  },
  {
    title: '記憶其實不是錄影機',
    kicker: '第三章｜認知心理學',
    activity: 'memoryPipeline',
    intro: '記憶包含編碼、儲存與提取。它不是完美存檔的硬碟，而是會不斷重組的神經網路。',
    points: ['編碼 (Encoding)', '儲存 (Storage)', '提取 (Retrieval)'],
    theory: [
      '認知心理學將記憶分為三個階段：我們必須先對資訊投入注意力進行「編碼」，接著將碎片化的神經連結「儲存」起來，最後在需要時進行「提取」。',
      '重點在於，「提取」並不是單純按下播放鍵。大腦會根據當下的情境、情緒與後來獲得的新資訊，把記憶碎片「重新建構」出來。',
      '因此，一個人非常有自信地回憶某件事，只代表他對重建的故事深信不疑，並不代表回憶的內容 100% 客觀正確。',
    ],
    questions: [
      { question: '記憶運作的三個主要階段，順序是？', options: ['編碼、儲存、提取', '儲存、提取、編碼', '提取、編碼、儲存'], answer: '編碼、儲存、提取' },
      { question: '現代心理學認為，每次回憶過去時其實都在發生什麼事？', options: ['記憶的重新建構', '播放高畫質錄影', '消除所有錯誤'], answer: '記憶的重新建構' },
      { question: '如果某人對自己的記憶非常有自信，代表什麼？', options: ['他相信自己的回憶，但不一定準確', '記憶 100% 正確', '他擁有超常記憶力'], answer: '他相信自己的回憶，但不一定準確' },
    ],
  },
  {
    title: '為什麼會記錯？',
    kicker: '第四章｜假記憶',
    activity: 'misinformation',
    intro: '來源失憶、暗示與錯誤訊息效應，隨時可能竄改我們以為確信不疑的記憶。',
    points: ['曼德拉效應', '假記憶 (False Memory)', '錯誤訊息效應 (Misinformation Effect)'],
    theory: [
      '心理學家 Elizabeth Loftus 的經典研究證實了「錯誤訊息效應」：人在經歷事件後，如果接收到帶有暗示的錯誤資訊，大腦會不自覺地將其混入原本的記憶中。',
      '大腦常會發生「來源失憶」——我們記得某個資訊，卻忘了是在哪裡聽到的，進而把別人的轉述當成自己親眼的見證。這對司法證人證詞與新聞傳播影響深遠。',
      '「曼德拉效應」則是大規模的集體假記憶。它提醒我們，就算多數人共同記得某件事，也不等於那件事真的發生過，社會文化也會悄悄改寫群體記憶。',
    ],
    questions: [
      { question: 'Elizabeth Loftus 的研究證實了暗示會導致什麼？', options: ['錯誤訊息效應改寫記憶', '記憶容量翻倍', '大腦停止運作'], answer: '錯誤訊息效應改寫記憶' },
      { question: '記得一件事，卻忘記是誰說的或在哪看到的，稱為？', options: ['來源失憶', '視覺盲點', '知覺組織'], answer: '來源失憶' },
      { question: '大量人群共同記錯同一個細節的現象稱為？', options: ['曼德拉效應', '接近律', '旁觀者效應'], answer: '曼德拉效應' },
    ],
  },
  {
    title: '人類其實不是理性動物',
    kicker: '第五章｜情緒心理學',
    activity: 'emotion',
    intro: '情緒是演化出來的快速反應機制。很多決策在意識察覺前，大腦就已經選好了。',
    points: ['情緒先於理性', '杏仁核劫持 (Amygdala Hijack)', '軀體標記 (Somatic Marker)'],
    theory: [
      '神經科學與演化心理學指出，情緒不是理性的敵人，而是大腦快速判斷環境的生存系統。遠古人類看到蛇會立刻恐懼逃跑，而不是站在原地分析那是無毒還是有毒的。',
      '大腦的「杏仁核」負責處理強烈情緒，它的反應速度遠快於負責理性的「前額葉皮質」。這就是為什麼生氣時我們常會說出事後後悔的話——因為理性還來不及踩煞車（杏仁核劫持）。',
      '人類不是沒有理性，而是「情緒總是先發制人」，理性往往是在情緒啟動後，才介入進行合理化或微調。',
    ],
    questions: [
      { question: '大腦中負責快速處理恐懼等強烈情緒的邊緣系統結構是？', options: ['杏仁核', '視覺皮層', '海馬迴'], answer: '杏仁核' },
      { question: '「情緒先於理性」在演化上的主要好處是？', options: ['能快速應對生存威脅', '能完美計算數學', '不會犯任何錯'], answer: '能快速應對生存威脅' },
      { question: '當強烈情緒蓋過前額葉皮質的理性控制，心理學俗稱為？', options: ['杏仁核劫持', '認知流暢', '提取失敗'], answer: '杏仁核劫持' },
    ],
  },
  {
    title: '情緒與決策',
    kicker: '第六章｜情緒與決策',
    activity: 'emotionDecision',
    intro: '焦慮、憤怒、快樂與悲傷，會像濾鏡一樣改變我們對風險與機率的評估。',
    points: ['情緒促發 (Affect Heuristic)', '注意力窄化', '生理激勵'],
    theory: [
      '當我們處於特定情緒中，大腦會啟動「情緒促發」：用當下的感受來評估未來的風險與報酬。例如，焦慮的人會高估負面事件發生的機率；快樂的人則容易低估風險、變得過度樂觀。',
      '強烈的情緒（如憤怒或極度恐慌）會導致「注意力窄化」，讓我們只看見眼前的威脅或單一解方，忽略了宏觀的背景資訊或長遠後果。',
      '因此，好的決策者不會試圖「消滅情緒」，而是學會「覺察情緒」——辨識出當下是哪種情緒正在改變自己的風險濾鏡。',
    ],
    questions: [
      { question: '處於強烈焦慮中，人最容易產生什麼傾向？', options: ['高估潛在威脅與風險', '冷靜分析所有選項', '過度樂觀相信自己會贏'], answer: '高估潛在威脅與風險' },
      { question: '極度憤怒時，大腦會出現「注意力窄化」，意思是？', options: ['只專注於眼前的衝突與攻擊', '能宏觀看見所有人的立場', '視野突然變得很寬廣'], answer: '只專注於眼前的衝突與攻擊' },
      { question: '用當下的情緒感受來代替複雜的風險評估，這被稱為？', options: ['情緒促發 (Affect Heuristic)', '閉合律', '記憶編碼'], answer: '情緒促發 (Affect Heuristic)' },
    ],
  },
  {
    title: '快思與慢想',
    kicker: '第七章｜決策心理學',
    activity: 'system',
    intro: '諾貝爾獎得主 Daniel Kahneman 提出，大腦擁有兩套截然不同的思考系統。',
    points: ['系統一 (System 1)', '系統二 (System 2)', '認知資源有限性'],
    theory: [
      '「系統一」是快速、自動、無意識且依賴情緒與直覺的運作模式。它不費力，能應付日常 90% 的判斷（如察言觀色、躲避障礙）。',
      '「系統二」是緩慢、刻意、需要集中注意力與邏輯推演的模式。它非常耗費「認知資源」，容易感到疲倦（自我耗損）。',
      '大腦天生是個「吝嗇鬼」，為了節省能量，會盡可能把工作交給系統一。這就是為什麼人在疲勞、時間緊迫或分心時，特別容易落入思考陷阱。',
    ],
    questions: [
      { question: '「系統一」思考機制的特徵是？', options: ['快速、直覺且自動化', '緩慢、費力且需要專注', '完全不依賴過去經驗'], answer: '快速、直覺且自動化' },
      { question: '當我們在做複雜數學題時，主要啟動的是哪一個系統？', options: ['系統二', '系統一', '邊緣系統'], answer: '系統二' },
      { question: '為什麼大腦常常不使用系統二進行理性分析？', options: ['因為它非常耗費認知資源與能量', '因為理性永遠是錯的', '因為人類沒有大腦皮質'], answer: '因為它非常耗費認知資源與能量' },
    ],
  },
  {
    title: '認知偏誤從哪裡來？',
    kicker: '第八章｜捷思法',
    activity: 'bias',
    intro: '偏誤不是因為人笨，而是大腦為了「生存效率」所發展出的捷徑。',
    points: ['有限理性 (Bounded Rationality)', '可得性捷思', '代表性捷思', '錨定效應'],
    theory: [
      '在複雜世界中收集完美資訊太花時間了，因此大腦演化出「捷思法 (Heuristics)」——在有限資訊下快速做出「夠用就好」決策的經驗法則。這被稱為「有限理性」。',
      '當捷思法在現代社會失效，就會產生「認知偏誤」。例如：「可得性捷思」讓人把容易想到的駭人新聞（如空難）誤以為發生機率極高。',
      '「錨定效應」讓第一個看到的數字（如原價 2999）成為大腦的衡量基準，讓後續的數字（特價 999）看起來超級划算。這都是商人家最愛用的心理機制。',
    ],
    questions: [
      { question: '大腦為了節省時間，在有限資訊下快速判斷的「心理捷徑」稱為？', options: ['捷思法 (Heuristics)', '演繹邏輯 (Deduction)', '大數據分析'], answer: '捷思法 (Heuristics)' },
      { question: '看了空難新聞後，就覺得搭飛機非常危險，這是受什麼影響？', options: ['可得性捷思', '代表性捷思', '確認偏誤'], answer: '可得性捷思' },
      { question: '第一個看見的資訊（如初始定價）會限制後續評估，稱為？', options: ['錨定效應', '從眾效應', '曼德拉效應'], answer: '錨定效應' },
    ],
  },
  {
    title: '為什麼大家都跟著做？',
    kicker: '第九章｜社會心理學',
    activity: 'scenario',
    intro: '我們以為自己很有主見，其實社會認同與群體壓力無時無刻不在重塑我們的認知。',
    points: ['從眾效應 (Conformity)', '社會認同', '規範性與訊息性影響'],
    theory: [
      'Solomon Asch 的經典從眾實驗證明，即使答案顯而易見是錯的，當周圍所有人都給出那個錯答案時，仍有高達 1/3 的人會因為壓力而「指鹿為馬」。',
      '人們跟著群體走通常有兩個原因：「規範性社會影響」（不想被排擠、想被群體接納）以及「訊息性社會影響」（認為多數人的選擇代表正確資訊）。',
      '當相似立場的人聚在一起討論，還會產生「群體極化」，讓原本溫和的觀點朝向極端發展，這在網路社群中極為常見。',
    ],
    questions: [
      { question: 'Asch 的經典線條實驗證實了人類具有什麼強烈傾向？', options: ['從眾效應', '記憶重建', '視覺錯覺'], answer: '從眾效應' },
      { question: '因為不知道該怎麼辦，所以覺得「多數人做的應該是對的」，這屬於？', options: ['訊息性社會影響', '規範性社會影響', '自利偏誤'], answer: '訊息性社會影響' },
      { question: '同溫層聚在一起討論後，觀點變得比原本更偏激，這現象稱為？', options: ['群體極化', '群體平庸', '旁觀者效應'], answer: '群體極化' },
    ],
  },
  {
    title: '社群媒體如何影響你',
    kicker: '第十章｜演算法與同溫層',
    activity: 'socialMedia',
    intro: 'FOMO、注意力經濟與演算法，正聯手改變我們接收資訊與看待世界的方式。',
    points: ['注意力經濟', '錯失恐懼症 (FOMO)', '迴音室效應 (Echo Chamber)'],
    theory: [
      '社群媒體的商業模式是「注意力經濟」——用演算法預測並推送能激起你情緒的內容，換取你更長的停留時間。',
      '這種機制利用了人類的「錯失恐懼症 (FOMO)」，讓人忍不住一直滑手機。同時，演算法持續推送你認同的觀點，形成「迴音室效應」與「過濾氣泡」。',
      '久而久之，你的世界被演算法篩選，反面證據被隱藏，讓人誤以為「全世界都跟我有一樣的想法」，加深了社會對立。',
    ],
    questions: [
      { question: '社群平台為了增加使用者停留時間，核心依賴的是？', options: ['演算法與注意力經濟', '完全客觀的新聞報導', '讓用戶感到無聊'], answer: '演算法與注意力經濟' },
      { question: '害怕錯過社群上的熱門話題或聚會，這種焦慮稱為？', options: ['錯失恐懼症 (FOMO)', '沉沒成本', '閉合律'], answer: '錯失恐懼症 (FOMO)' },
      { question: '只看到自己認同的觀點，聽不到不同聲音的現象稱為？', options: ['迴音室效應', '完形心理學', '認知流暢度'], answer: '迴音室效應' },
    ],
  },
  {
    title: '陰謀論的心理學',
    kicker: '第十一章｜相信不一定是真的事',
    activity: 'conspiracy',
    intro: '為什麼離譜的都市傳說與陰謀論總是有人信？這與大腦的模式辨識與控制感需求有關。',
    points: ['錯覺模式辨識', '動機性推理', '控制感剝奪'],
    theory: [
      '人類大腦是非常敏銳的「模式辨識機」，這讓我們能找出因果關係。但當大腦過度運作時，就會產生「錯覺模式辨識」——在隨機事件中強行看出關聯。',
      '當社會發生重大危機或人感到失控時，陰謀論提供了一個「有人在背後操控」的解釋，這比「事情是隨機發生的」更能安撫人們對未知的不安，補足控制感。',
      '一旦相信了陰謀論，就會啟動「動機性推理」與「確認偏誤」，信徒只會吸收支持論點的資訊，甚至把反駁的證據視為「掩蓋真相的更大陰謀」。',
    ],
    questions: [
      { question: '在隨機發生的巧合中硬是看出關聯與陰謀，這與大腦的什麼功能過度運作有關？', options: ['錯覺模式辨識', '長度錯覺', '色彩辨識'], answer: '錯覺模式辨識' },
      { question: '從心理學角度看，陰謀論常在什麼時候最容易流行？', options: ['社會危機與人們缺乏控制感時', '天下太平無事時', '大家都在睡覺時'], answer: '社會危機與人們缺乏控制感時' },
      { question: '把反駁自己觀點的證據也說成是「假新聞」或「掩蓋真相」，這是受到什麼影響？', options: ['動機性推理與確認偏誤', '後見之明偏誤', '錨定效應'], answer: '動機性推理與確認偏誤' },
    ],
  },
  {
    title: '假新聞是怎麼傳播的？',
    kicker: '第十二章｜資訊判讀',
    activity: 'fakeNews',
    intro: '假新聞的傳播速度遠快於真相，因為它們懂得利用強烈情緒與身分保護認知。',
    points: ['情緒傳染 (Emotional Contagion)', '負面偏誤', '身分保護認知'],
    theory: [
      '麻省理工學院的研究指出，假新聞在 Twitter 上的傳播速度是真相的六倍。因為假新聞的設計往往訴諸「驚奇、憤怒與恐懼」等高喚起情緒。',
      '人類天生有「負面偏誤」，對威脅性資訊特別敏感。當看到聳動標題時，我們常在查證真偽之前，就因為情緒衝動而按下分享。',
      '此外，「身分保護認知」讓我們傾向轉傳符合自己政治或群體立場的訊息。在這裡，轉傳不再是為了「傳遞真相」，而是為了「宣示立場與痛擊對手」。',
    ],
    questions: [
      { question: '研究指出假新聞傳播比真相快，主要原因是假新聞常利用？', options: ['強烈的高喚起情緒（如憤怒）', '枯燥的數據分析', '非常長的邏輯推演'], answer: '強烈的高喚起情緒（如憤怒）' },
      { question: '人類天生對危險、負面的資訊特別敏感，這稱為？', options: ['負面偏誤', '光環效應', '相似性吸引'], answer: '負面偏誤' },
      { question: '轉傳假新聞有時不是為了真相，而是為了宣示政治立場，這與什麼有關？', options: ['身分保護認知', '視覺建構', '工作記憶'], answer: '身分保護認知' },
    ],
  },
  {
    title: '建立心理防禦機制',
    kicker: '第十三章｜應用心理學',
    activity: 'toolkit',
    intro: '了解大腦的弱點後，我們該如何為自己安裝「去偏誤 (Debiasing)」的防禦機制？',
    points: ['去偏誤技術', '後設認知 (Metacognition)', '反向思考與延遲決策'],
    theory: [
      '「去偏誤」並不是要求自己變成毫無感情的機器人，而是建立一套刻意的提醒流程，讓我們在關鍵時刻喚醒系統二。',
      '核心能力在於「後設認知」——思考自己的思考（Thinking about thinking）。覺察自己現在是否處於情緒高漲、疲倦或被時間壓制的情境中。',
      '實用的防禦技巧包括：「延遲決策」（讓衝動情緒消退）、「尋找反證」（刻意搜尋與自己意見相反的觀點）以及「拉開心理距離」（問自己：如果是我最好的朋友遇到，我會怎麼建議？）。',
    ],
    questions: [
      { question: '心理學中，思考自己的思考過程、覺察自身狀態的能力稱為？', options: ['後設認知', '初級感覺', '無意識編碼'], answer: '後設認知' },
      { question: '避免衝動購物或說出後悔的話，最簡單有效的防禦機制是？', options: ['延遲決策', '立刻找人吵架', '完全不睡覺'], answer: '延遲決策' },
      { question: '為了打破「確認偏誤」，我們應該刻意進行什麼練習？', options: ['尋找反證與反向思考', '只看同溫層的文章', '跟著多數人投票'], answer: '尋找反證與反向思考' },
    ],
  },
  {
    title: '培養批判思考',
    kicker: '第十四章｜理性決策檢查表',
    activity: 'toolkit',
    intro: '用清晰的決策檢查表來檢驗資訊，將貝氏更新與知識謙遜融入日常思維。',
    points: ['知識的謙遜', '貝氏更新', '理性決策檢查'],
    theory: [
      '批判思考的起點是「知識的謙遜 (Epistemic Humility)」：承認自己的大腦內建偏誤，並且「我可能是錯的」。',
      '優秀的思考者會採用「貝氏更新 (Bayesian Updating)」的心態：不把信念當成絕對真理，而是根據新出現的可靠證據，隨時動態微調自己的看法。',
      '面對複雜資訊，請使用理性檢查表：1. 證據的來源與品質為何？ 2. 是否存在反面案例？ 3. 我此刻是否受到情緒或同溫層影響？ 4. 我是否因為沉沒成本而不願改變心意？',
    ],
    questions: [
      { question: '承認自己大腦有偏誤、認知有限，並抱持「我可能是錯的」的心態，稱為？', options: ['知識的謙遜', '達克效應', '自利偏誤'], answer: '知識的謙遜' },
      { question: '根據新出現的可靠證據，動態調整並修正自己原有看法的思維方式是？', options: ['貝氏更新', '錨定效應', '刻板印象'], answer: '貝氏更新' },
      { question: '一個良好的理性檢查表「不」應該包含哪一個問題？', options: ['這件事哪個網紅罵得最大聲？', '證據的來源與品質為何？', '我是否只看見想看的資訊？'], answer: '這件事哪個網紅罵得最大聲？' },
    ],
  },
  {
    title: '我的思考地圖',
    kicker: '最後章｜認識自己',
    activity: 'map',
    intro: '整合一路以來的測驗與互動，看見自己思考過程中的慣性與潛力。',
    points: ['自我覺察', '偏誤慣性', '優化決策路徑'],
    theory: [
      '學習心理學的最終目的，不是為了在考卷上拿高分，更不是為了用名詞去批判別人，而是用來「自我覺察」。',
      '透過回顧你在這趟旅程中的互動：你是容易被視覺引導？常受從眾壓力影響？還是很快就被情緒與稀缺性牽著走？',
      '當你看見了自己的「思考地圖」，你就不再只是大腦直覺機制的被動反應者。你拿回了方向盤，擁有在快思與慢想之間切換的自由意志。',
    ],
    questions: [
      { question: '學習這些心理學知識與偏誤，最重要的核心目標是？', options: ['自我覺察與優化決策', '用專有名詞嘲笑別人', '成為廣告行銷大師'], answer: '自我覺察與優化決策' },
      { question: '透過看見自己的思考地圖與偏誤慣性，我們能夠獲得什麼？', options: ['在直覺與理性間切換的自由', '大腦不再耗費任何能量', '永久消除所有情緒'], answer: '在直覺與理性間切換的自由' },
      { question: '當我們看見自己的盲點並願意修正，這體現了什麼？', options: ['心理學在生活中的實踐', '確認偏誤的發作', '記憶提取的失敗'], answer: '心理學在生活中的實踐' },
    ],
  },
]

const currentChapter = computed(() => chapters[activeChapter.value])
const currentDone = computed(() => Boolean(interactionDone[activeChapter.value]))
const totalScore = computed(() => Object.values(chapterScores).reduce((sum, item) => sum + item.score, 0))

// quiz page state
const quizPageOpen = ref(false)
const quizChapterIndex = ref(null)

function openFullQuiz(index) {
  quizChapterIndex.value = index
  quizPageOpen.value = true
}

function closeFullQuiz() {
  quizPageOpen.value = false
  quizChapterIndex.value = null
}

const completedCount = computed(() => Object.keys(interactionDone).length)
const completionPercent = computed(() => Math.round((completedCount.value / chapters.length) * 100))

function startLearning(profile) {
  learner.value = profile
}

async function deleteRemoteUser(username) {
  if (!username) return
  const body = new URLSearchParams({
    action: 'deleteAccount',
    username,
  })

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
    })
  } catch (err) {
    console.warn('刪除遠端帳號資料失敗', err)
  }
}

function logout() {
  learner.value = null
  // clear saved state
  localStorage.removeItem('learner')
  localStorage.removeItem('interactionDone')
  localStorage.removeItem('chapterScores')
  localStorage.removeItem('userSignals')
  localStorage.removeItem('psychLabState')
  // reset in-memory state
  Object.keys(interactionDone).forEach((k) => delete interactionDone[k])
  Object.keys(chapterScores).forEach((k) => delete chapterScores[k])
  Object.keys(userSignals).forEach((k) => { if (k in userSignals) userSignals[k] = 0 })
}

async function deleteAccount() {
  const confirmed = window.confirm('確定要刪除帳號？此操作無法復原，所有學習紀錄都將被刪除。')
  if (!confirmed) return

  if (learner.value && learner.value.username) {
    await deleteRemoteUser(learner.value.username)
  }

  logout()
  accountOpen.value = false
  alert('帳號及所有紀錄已刪除。')
}

// account menu + profile modal state
const accountOpen = ref(false)
const profileOpen = ref(false)

function toggleAccountMenu() {
  accountOpen.value = !accountOpen.value
}

function openProfile() {
  accountOpen.value = false
  profileOpen.value = true
}

function closeProfile() {
  profileOpen.value = false
}

function exportProgress() {
  const payload = {
    learner: learner.value,
    interactionDone: interactionDone,
    chapterScores: chapterScores,
    userSignals: userSignals,
    exportedAt: new Date().toISOString(),
  }
  const data = JSON.stringify(payload, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const filename = `progress_${(learner.value && (learner.value.username || learner.value.name)) || 'user'}.json`
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  accountOpen.value = false
}


// persist relevant state to localStorage whenever they change
watch(learner, (nv) => {
  if (nv) localStorage.setItem('learner', JSON.stringify(nv))
}, { deep: true })

watch(() => interactionDone, (nv) => {
  try { localStorage.setItem('interactionDone', JSON.stringify(nv)) } catch(e){}
}, { deep: true })

watch(() => chapterScores, (nv) => {
  try { localStorage.setItem('chapterScores', JSON.stringify(nv)) } catch(e){}
}, { deep: true })

watch(() => userSignals, (nv) => {
  try { localStorage.setItem('userSignals', JSON.stringify(nv)) } catch(e){}
}, { deep: true })

onMounted(() => {
  // restore learner and progress from localStorage
  try {
    const sLearner = localStorage.getItem('learner')
    if (sLearner) learner.value = JSON.parse(sLearner)

    const sDone = localStorage.getItem('interactionDone')
    if (sDone) Object.assign(interactionDone, JSON.parse(sDone))

    const sScores = localStorage.getItem('chapterScores')
    if (sScores) Object.assign(chapterScores, JSON.parse(sScores))

    const sSignals = localStorage.getItem('userSignals')
    if (sSignals) {
      const parsed = JSON.parse(sSignals)
      Object.entries(parsed).forEach(([k,v]) => { if (k in userSignals) userSignals[k] = v })
    }
  } catch (e) {
    console.error('restore state failed', e)
  }
})

function markDone(index = activeChapter.value) {
  interactionDone[index] = true
}

function addSignals(payload = {}) {
  Object.entries(payload).forEach(([key, value]) => {
    if (key in userSignals) {
      userSignals[key] += value
    }
  })
  markDone()
}

function saveChapterScore(result) {
  chapterScores[result.chapterIndex] = result
}
</script>

<template>
  <LoginHome
    v-if="!learner"
    :apps-script-url="APPS_SCRIPT_URL"
    @login="startLearning"
  />

  <template v-else>
    <div class="topbar">
        <div class="topbar-inner">
          <div class="topbar-left">歡迎，{{ (learner && (learner.name || learner.username)) || '學習者' }}</div>
          <div class="topbar-right">
            <div class="account" @click.stop>
              <button class="account-btn" type="button" @click="toggleAccountMenu">
                {{ (learner && (learner.name || learner.username)) || '學習者' }}
                <span class="caret">▾</span>
              </button>
              <div v-if="accountOpen" class="account-menu">
                <button class="account-item" type="button" @click="openProfile">檢視帳號</button>
                <button class="account-item" type="button" @click="exportProgress">匯出進度</button>
                <button class="account-item" type="button" @click="logout">登出</button>
                <button class="account-item account-item-danger" type="button" @click="deleteAccount">刪除帳號</button>
              </div>
            </div>
          </div>
        </div>
    </div>

    <HeroSection />

    <div class="top-progress">
      <div class="progress-track"><div class="progress-fill" :style="{ width: completionPercent + '%' }"></div></div>
      <div class="progress-label">已完成 {{ completionPercent }}%</div>
    </div>

    <main v-if="!quizPageOpen" class="site-shell">
      <ChapterNavigation
        :chapters="chapters"
        :active-index="activeChapter"
        @select="activeChapter = $event"
      />

      <ChapterPanel :chapter="currentChapter">
        <!-- 期末專題：沉浸式互動展區 (組件建立前先降級使用 PsychologyLab) -->
        <!-- <StroopDemo v-if="currentChapter.activity === 'stroop'" @answered="addSignals" /> -->
        <!-- <DefaultEffectDemo v-else-if="currentChapter.activity === 'defaultEffect'" @answered="addSignals" /> -->
        <!-- <DecoyDemo v-else-if="currentChapter.activity === 'decoy'" @answered="addSignals" /> -->
        <!-- <BrainMapDemo v-else-if="currentChapter.activity === 'brainMap'" @answered="addSignals" /> -->
        <!-- <RadarQuizDemo v-else-if="currentChapter.activity === 'radarQuiz'" @answered="addSignals" /> -->
        <!-- <ParallaxStoryDemo v-else-if="currentChapter.activity === 'parallaxStory'" @answered="addSignals" /> -->
        <!-- <FinalEndingDemo v-else-if="currentChapter.activity === 'finalEnding'" @finished="markDone()" /> -->
        <PsychologyLab :signals="userSignals" @answered="addSignals" />

        <button
          v-if="!currentDone"
          class="primary-action reveal-theory"
          type="button"
          @click="markDone()"
        >
          我已完成互動，閱讀完整理論
        </button>

        <TheoryExplainer
          v-if="currentDone"
          :chapter="currentChapter"
        />

        <div v-if="currentDone" style="margin-top:12px; display:flex; gap:8px; align-items:center;">
          <button class="primary-action" type="button" @click="openFullQuiz(activeChapter)">前往測驗（新頁面）</button>
          <small style="color:var(--text-muted)">或在此頁直接練習（保留右側按鈕）</small>
        </div>
      </ChapterPanel>
    </main>
    
    <FullPageQuiz
      v-if="quizPageOpen"
      :chapter="chapters[quizChapterIndex]"
      :chapter-index="quizChapterIndex"
      :learner="learner"
      :apps-script-url="APPS_SCRIPT_URL"
      :total-score="totalScore"
      @close="closeFullQuiz"
      @scored="saveChapterScore"
    />
  
        <!-- profile modal -->
        <div v-if="profileOpen" class="account-modal" @click.self="closeProfile">
          <div class="account-modal-body">
            <h3>帳號資訊</h3>
            <p>姓名：{{ (learner && learner.name) || '—' }}</p>
            <p>使用者名稱：{{ (learner && learner.username) || '—' }}</p>
            <p>開始時間：{{ (learner && learner.startedAt) || '—' }}</p>
            <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end;">
              <button class="text-action" type="button" @click="closeProfile">關閉</button>
            </div>
          </div>
        </div>
  </template>
</template>

<style>
/* 🌌 期末專題全局強制覆寫：深色沉浸式科技主題 */
:root {
  --bg-color: rgba(15, 23, 42, 0.85) !important;        /* 深藍 (帶 85% 透明度，讓底圖透出) */
  --panel-bg: rgba(30, 41, 59, 0.85) !important;        /* 卡片背景 (帶 85% 透明度) */
  --primary-color: #38BDF8 !important;   /* 科技藍 */
  --accent-color: #A855F7 !important;    /* 神秘紫 */
  --text-color: #F8FAFC !important;      /* 白字 */
  --text-muted: #94A3B8 !important;
}

body {
  background-color: var(--bg-color) !important;
}

body, .site-shell, .login-home {
  background-color: transparent !important;
  color: var(--text-color) !important;
}

html, body, #app { height: 100%; margin: 0 }

.site-shell { width: min(1160px, calc(100% - 40px)); margin: 0 auto 32px; padding-top: 12px; padding-bottom: 12px }

.interactive-block, .chapter-panel, .theory-section, .chapter-quiz {
  background-color: var(--panel-bg) !important;
  color: var(--text-color) !important;
  border: 1px solid rgba(56, 189, 248, 0.15) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
}

button.primary-action {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color)) !important;
  color: #fff !important;
  border: none !important;
}

.nav-item { color: var(--text-muted) !important; }
.nav-item.active {
  color: var(--primary-color) !important;
  background-color: rgba(56, 189, 248, 0.1) !important;
  border-left: 3px solid var(--primary-color) !important;
}

/* topbar + logout */
.topbar { position: sticky; top: 12px; z-index: 80; width: calc(100% - 40px); margin: 12px auto; }
.topbar-inner { display:flex; justify-content:space-between; align-items:center; gap:12px }
.topbar-left { color: var(--text-muted); font-weight:700 }
.logout-btn { border: 1px solid rgba(255,255,255,0.08); background: transparent; color: var(--text-color); padding: 8px 12px; border-radius:8px; cursor:pointer }
.logout-btn:hover { background: rgba(255,255,255,0.04) }

/* account dropdown */
.account { position: relative }
.account-btn { border: 1px solid rgba(255,255,255,0.06); background: transparent; color: var(--text-color); padding: 8px 12px; border-radius:8px; font-weight:800; cursor:pointer }
.account-btn .caret { margin-left:8px; opacity:0.85 }
.account-menu { position: absolute; right: 0; top: calc(100% + 8px); background: var(--panel-bg); border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius:8px; box-shadow: 0 8px 28px rgba(0,0,0,0.45); min-width:160px; z-index:90 }
.account-item { display:block; width:100%; text-align:left; padding:8px 10px; border:0; background:transparent; color:var(--text-color); font-weight:700; border-radius:6px; cursor:pointer }
.account-item:hover { background: rgba(255,255,255,0.03) }
.account-item-danger { color: #ef5350; font-weight: 900 }
.account-item-danger:hover { background: rgba(239,83,80,0.1) }

/* profile modal */
.account-modal { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(2,6,23,0.6); z-index: 100 }
.account-modal-body { width:100%; max-width:420px; background: var(--panel-bg); color: var(--text-color); padding:18px; border-radius:10px; box-shadow: 0 16px 48px rgba(0,0,0,0.6) }
.account-modal-body h3 { margin:0 0 8px; color: var(--primary-color) }

/* enhance content contrast */
.chapter-panel p,
.chapter-panel .eyebrow,
.theory-section p,
.interactive-block p,
.chapter-quiz p,
.hero-subtitle {
  color: rgba(248,250,252,0.9) !important;
}

/* 修正右側「深入解釋欄」：改回白字，並將背景調整為深藍色 */
.selection-helper {
  background-color: rgba(15, 23, 42, 0.6) !important;
  border: 1px solid rgba(56, 189, 248, 0.2) !important;
}
.selection-helper p {
  color: rgba(248, 250, 252, 0.9) !important; 
}

/* top progress */
.top-progress { width: min(1160px, calc(100% - 40px)); margin: 12px auto; display:flex; align-items:center; gap:12px }
.progress-track { flex: 1; height: 10px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow:hidden }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); width:0 }
.progress-label { color: var(--text-muted); font-weight:800 }
</style>
