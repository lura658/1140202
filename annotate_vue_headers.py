from pathlib import Path

mapping = {
    'src/App.vue': ('主流程 / 全站章節總覽', '整合首頁、章節導覽、互動實驗與測驗成果報告。'),
    'src/components/ChapterNavigation.vue': ('章節導覽', '提供側邊章節切換與進度導覽。'),
    'src/components/ChapterPanel.vue': ('單一章節說明', '顯示章節標題、簡介與學習重點。'),
    'src/components/ChapterQuiz.vue': ('單章測驗', '執行該章節問答並回傳分數結果。'),
    'src/components/FullPageQuiz.vue': ('全頁測驗', '開啟單章完整測驗頁面。'),
    'src/components/PsychologyLab.vue': ('心理學實驗室', '依章節顯示互動題與實驗結果。'),
    'src/components/TheoryExplainer.vue': ('理論說明', '呈現該章節的核心概念與解釋。'),
    'src/components/BiasExplorer.vue': ('偏誤探索', '展示偏誤案例與認知傾向分析。'),
    'src/components/BiasCard.vue': ('偏誤卡片', '顯示單一偏誤的要點與實例。'),
    'src/components/DecisionToolkit.vue': ('決策工具', '提供判斷與反思的輔助工具。'),
    'src/components/EmotionDecision.vue': ('情緒決策', '模擬情緒影響下的選擇行為。'),
    'src/components/ShoppingSimulator.vue': ('購物模擬', '展示消費決策與促銷影響。'),
    'src/components/ConspiracyDemo.vue': ('陰謀論案例', '以互動方式演示陰謀論判斷。'),
    'src/components/FakeNewsDemo.vue': ('假新聞辨識', '教導辨識虛假訊息與來源可信度。'),
    'src/components/GestaltDemo.vue': ('格式塔視覺', '展示整體知覺與錯覺現象。'),
    'src/components/IllusionDemo.vue': ('視覺錯覺', '呈現先入為主的視覺錯覺效果。'),
    'src/components/MisinformationDemo.vue': ('錯誤資訊', '模擬錯誤訊息對判斷的影響。'),
    'src/components/SocialMediaDemo.vue': ('社群媒體', '展示平台演算法與訊息傳播影響。'),
    'src/components/MemoryChallenge.vue': ('記憶挑戰', '測試記憶與認知負荷表現。'),
    'src/components/MemoryPipeline.vue': ('記憶流程', '說明記憶形成、保留與遺忘。'),
    'src/components/SystemQuiz.vue': ('系統性測驗', '進行快速判斷與系統性思考題。'),
    'src/components/ScenarioQuiz.vue': ('情境測驗', '以情境案例評估判斷與反應。'),
    'src/components/QuickQuiz.vue': ('快速測驗', '做短版問答練習與即時回饋。'),
    'src/components/ResultChart.vue': ('成績圖表', '視覺化各章節測驗結果與進度。'),
    'src/components/ThinkingMapReport.vue': ('思維地圖報告', '總結認知傾向與學習成果。'),
    'src/components/LoginHome.vue': ('登入首頁', '展示入口與使用者導覽流程。'),
}

for rel, (chapter, func) in mapping.items():
    path = Path(rel)
    text = path.read_text(encoding='utf-8')
    if text.startswith('<!--') and '對應章節' in text:
        continue
    block = "<!--\n" \
            "  * 對應章節：" + chapter + "\n" \
            "  * 檔案功能：" + func + "\n" \
            "-->\n\n" + text.lstrip('\ufeff')
    path.write_text(block, encoding='utf-8')

print('annotated', len(mapping))
