<script setup lang="ts">
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";

defineOptions({
  name: "TypographyPage",
});
</script>

<template>
  <PageWrapper class="">
    <NScrollbar class="h-full rounded-2xl">
      <NCard>
        <article class="article font-song chinese chinese-truegray">
          <h1 class="article__title">
            中文网页字体排列方案
          </h1>
          <blockquote>这是一个旨在优化<u>中文网站</u>或应用程序字体显示的项目。通过使用这个项目，您可以获得一个默认的字体排列方案，以确保在没有指定字体的情况下，页面中选择的字体尽可能符合<u>中文阅读</u>的要求。这个项目的字体排列方案是基于<u>中文阅读体验</u>的考虑，它优先选择在中文环境中广泛使用和受欢迎的字体，并根据字体支持的字形、符号以及跨平台支持来确定字体的优先级顺序。</blockquote>

          <nav class="article__nav no-chinese">
            <details open>
              <summary>目录</summary>
              <ol>
                <li><a v-anchor="'#intro'">介绍</a></li>
                <li><a v-anchor="'#usage'">使用方法</a></li>
                <li>
                  <a v-anchor="'#examples'">效果演示</a>
                  <ul>
                    <li><a v-anchor="'#example-ancient'">古文</a></li>
                    <li><a v-anchor="'#example-verse'">诗词</a></li>
                    <li><a v-anchor="'#example-annotation'">行间注</a></li>
                    <li><a v-anchor="'#example-columns'">多栏排版</a></li>
                    <li><a v-anchor="'#example-vertical'">竖排排版</a></li>
                  </ul>
                </li>
                <li><a v-anchor="'#guidelines'">设计原则</a></li>
                <li>
                  <a v-anchor="'#appendix'">附录</a>
                  <ol class="chinese-list-latin">
                    <li><a v-anchor="'#tags'">标签示例表</a></li>
                  </ol>
                </li>
              </ol>
            </details>
          </nav>

          <h2 id="intro">
            介绍<a v-anchor="'#intro'" class="anchor">#</a>
          </h2>
          <p><ruby class="chinese-ruby--inline">unocss-preset-chinese</ruby><ruby class="chinese-ruby--inline">-typography<rp>(</rp><rt lang="zh-Latn">排版</rt><rp>)</rp></ruby>是专为中文网页内容设计的排版样式增强。它基于通行的中文排版规范，可为网站的读者带来更好的内容阅读体验。它的主要特性有：</p>
          <ul>
            <li>贴合网格的排版；</li>
            <li>全标签样式美化；</li>
            <li>预置古文、诗词样式；</li>
            <li>预置多种排版样式（行间注、多栏、竖排等）；</li>
            <li>多种预设字体族</li>
            <li>简/繁体中文支持；</li>
            <li>移动端支持；</li>
            <li>……</li>
          </ul>
          <p>总之，用上就会变好看。</p>

          <hr>

          <h2 id="usage">
            使用方法<a v-anchor="'#usage'" class="anchor">#</a>
          </h2>
          <p>项目地址：<a href="https://github.com/kirklin/unocss-preset-chinese">https://github.com/kirklin/unocss-preset-chinese</a>，使用方法如下：</p>
          <ol>
            <li>
              在您的 UnoCss 配置文件中引入 unocss-preset-chinese 并将其添加到 presets 部分：
              <pre><code>import presetChinese, { chineseTypography } from "unocss-preset-chinese";
   export default defineConfig({
     presets: [
       presetUno(),
       chineseTypography(),
       presetChinese(),
       // ...custom presets
     ],
   });
          </code></pre>
            </li>
            <li>
              在要作用的容器元素上增加<code>class="chinese"</code>的类名即可：

              <pre><code>&lt;article class=&quot;entry <ins>chinese</ins>&quot;&gt;
  &lt;h1&gt;读者的角色与经典同样重要&lt;/h1&gt;
  &lt;p&gt;一切诸经，皆不过是敲门砖，是要敲开门，唤出其中的人来，此人即是你自己。&lt;/p&gt;
  ……
&lt;/article&gt;</code></pre>
            </li>
          </ol>
          <small>注：unocss-preset-chinese-typography是正文区域的样式增强，不是<i>CSS Reset</i>的替代。因此<b>不建议</b>将它作用在根标签（如<code>&lt;body&gt;</code>或<code>&lt;div id=&quot;app&quot;&gt;</code>）上。</small>

          <hr>

          <h2 id="examples">
            效果示例<a v-anchor="'#examples'" class="anchor">#</a>
          </h2>
          <p>本页面<em>全页</em>应用了unocss-preset-chinese-typography样式，所见即所得。下面是内置的多种排版效果演示。</p>

          <h3 id="example-ancient">
            古文<a v-anchor="'#example-ancient'" class="anchor">#</a>
          </h3>
          <details>
            <summary>如何使用？</summary>
            <p>为容器元素<code>&lt;div class=&quot;chinese&quot;&gt;</code>添加名为<code>chinese--ancient</code>的class即可实现古文版式：</p>
            <pre><code>&lt;div class=&quot;chinese chinese--ancient&quot;&gt;...&lt;/div&gt;</code></pre>
          </details>
          <details open>
            <summary>示例</summary>
            <section class="demo">
              <div class="chinese chinese--ancient">
                <h1>出师表</h1>
                <p class="chinese-meta chinese-small">
                  作者：<abbr title="字孔明">諸葛亮</abbr>（181年～234年10月8日）
                </p>
                <p>先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。</p>
                <p>宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理；不宜偏私，使内外异法也。</p>
                <p>侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下：愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。</p>
                <p>将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。</p>
                <p>亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。</p>
                <p>臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。</p>
                <p>先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。</p>
                <p>愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。</p>
                <p>今当远离，临表涕零，不知所言。</p>
              </div>
            </section>
          </details>

          <h3 id="example-verse">
            诗词<a v-anchor="'#example-verse'" class="anchor">#</a>
          </h3>
          <details>
            <summary>如何使用？</summary>
            <ul>
              <li>
                诗词：为容器元素<code>&lt;div class=&quot;chinese&quot;&gt;</code>添加名为<code>chinese--poetry</code>的class实现诗词版式：
                <pre><code>&lt;div class=&quot;chinese chinese--poetry&quot;&gt;
  &lt;h2&gt;九月九日忆山东兄弟&lt;span class=&quot;chinese-meta chinese-small&quot;&gt;[唐]&lt;abbr title=&quot;号摩诘居士&quot;&gt;王维&lt;/abbr&gt;&lt;/span&gt;&lt;/h2&gt;
  &lt;p class=&quot;chinese-x-large&quot;&gt;
    独在异乡为异客&lt;span class=&quot;chinese-hang&quot;&gt;，&lt;/span&gt;&lt;br&gt;
    每逢佳节倍思亲&lt;span class=&quot;chinese-hang&quot;&gt;。&lt;/span&gt;&lt;br&gt;
    遥知兄弟登高处&lt;span class=&quot;chinese-hang&quot;&gt;，&lt;/span&gt;&lt;br&gt;
    遍插茱萸少一人&lt;span class=&quot;chinese-hang&quot;&gt;。&lt;/span&gt;
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
              </li>
              <li>
                诗节：在古文版式<code>&lt;div class=&quot;chinese chinese--ancient&quot;&gt;</code>中，为诗句添加名为<code>chinese-verse</code>的class可以将其居中显示：
                <pre><code>&lt;div class=&quot;chinese chinese--ancient&quot;&gt;
  &lt;h2&gt;一剪梅&middot;红藕香残玉簟秋&lt;span class=&quot;chinese-meta chinese-small&quot;&gt;[宋]&lt;abbr title=&quot;号易安居士&quot;&gt;李清照&lt;/abbr&gt;&lt;/span&gt;&lt;/h2&gt;
  &lt;p class=&quot;chinese-verse chinese-x-large&quot;&gt;
    红藕香残玉簟秋。轻解罗裳，独上兰舟&lt;span class=&quot;chinese-hang&quot;&gt;。&lt;/span&gt;&lt;br&gt;
    云中谁寄锦书来，雁字回时，月满西楼&lt;span class=&quot;chinese-hang&quot;&gt;。&lt;/span&gt;&lt;br&gt;
    花自飘零水自流。一种相思，两处闲愁&lt;span class=&quot;chinese-hang&quot;&gt;。&lt;/span&gt;&lt;br&gt;
    此情无计可消除，才下眉头，却上心头&lt;span class=&quot;chinese-hang&quot;&gt;。&lt;/span&gt;
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
              </li>
              <li>搭配使用标点悬挂<code>&lt;span class=&quot;chinese-hang&quot;&gt;</code>、元信息<code>&lt;span class=&quot;chinese-meta chinese-small&quot;&gt;</code>来丰富展示效果。</li>
            </ul>
          </details>
          <details open>
            <summary>示例</summary>
            <section class="demo">
              <div class="chinese chinese--ancient">
                <h2>一剪梅·红藕香残玉簟秋<span class="chinese-meta chinese-small">[宋]<abbr title="号易安居士">李清照</abbr></span></h2>
                <p class="chinese-verse chinese-x-large">
                  红藕香残玉簟秋。轻解罗裳，独上兰舟<span class="chinese-hang">。</span><br>
                  云中谁寄锦书来，雁字回时，月满西楼<span class="chinese-hang">。</span><br>
                  花自飘零水自流。一种相思，两处闲愁<span class="chinese-hang">。</span><br>
                  此情无计可消除，才下眉头，却上心头<span class="chinese-hang">。</span>
                </p>
              </div>
              <hr>
              <div class="chinese chinese--poetry">
                <h2>好了歌<span class="chinese-meta chinese-small">[清]<abbr title="著曹雪芹">曹雪芹</abbr></span></h2>
                <p class="chinese-x-large">
                  世人都晓神仙好，惟有功名忘不了；<br>
                  古今将相在何方？荒冢一堆草没了。<br>
                  世人都晓神仙好，只有金银忘不了；<br>
                  终朝只恨聚无多，及到多时眼闭了。<br>
                  世人都晓神仙好，只有姣妻忘不了；<br>
                  君生日日说恩情，君死又随人去了。<br>
                  世人都晓神仙好，只有儿孙忘不了；<br>
                  痴心父母古来多，孝顺儿孙谁见了！<br>
                </p>
              </div>
            </section>
          </details>

          <h3 id="example-annotation">
            行间注<a v-anchor="'#example-annotation'" class="anchor">#</a>
          </h3>
          <details>
            <summary>如何使用？</summary>
            <p>为容器元素<code>&lt;div class=&quot;chinese&quot;&gt;</code>添加名为<code>chinese--annotation</code>的class后，搭配<code>&lt;ruby&gt;</code>元素即可实现整齐的行间注效果：</p>
            <pre><code>&lt;div class=&quot;chinese chinese--annotation&quot;&gt;...&lt;/div&gt;</code></pre>
          </details>
          <details open>
            <summary>示例</summary>
            <section class="demo">
              <div class="chinese chinese--ancient chinese--annotation">
                <h2>庖丁解牛</h2>
                <p class="chinese-meta chinese-small">
                  作者：<abbr title="庄子">庄周</abbr>（公元前369～公元前286年）
                </p>
                <p>吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑。缘督以为经，可以保身，可以全生，可以养亲，可以尽年。</p>
                <p><u title="名丁的厨工。先秦古书往往以职业放在人名前"><ruby>庖<rp>(</rp><rt lang="zh-Latn">páo</rt><rp>)</rp></ruby>丁</u>为文惠君解牛，手之所触，肩之所倚，足之所履，膝之所<u title="支撑，接触"><ruby>踦<rp>(</rp><rt lang="zh-Latn">yǐ</rt><rp>)</rp></ruby></u>，<u title="砉然：砉，又读xū，象声词。砉然，皮骨相离的声音"><ruby>砉<rp>(</rp><rt lang="zh-Latn">huā</rt><rp>)</rp></ruby>然</u><ruby>向<rp>(</rp><rt lang="zh-Latn">xiǎng</rt><rp>)</rp></ruby>然，奏刀<u title="騞然：象声词，形容比砉然更大的进刀解牛声"><ruby>騞<rp>(</rp><rt lang="zh-Latn">huō</rt><rp>)</rp></ruby>然</u>，莫不中音。合于《桑林》之舞，乃中《经首》之会。</p>
                <p>文惠君曰：「嘻，善哉！技<u title="通「盍」，何，怎样"><ruby>盖<rp>(</rp><rt lang="zh-Latn">hé</rt><rp>)</rp></ruby></u>至此乎？」</p>
                <p>庖丁释刀对曰：「臣之所好者，道也，进乎技矣。始臣之解牛之时，所见无非牛者。三年之后，未尝见全牛也。方今之时，臣以神遇而不以目视，官知止而<u title="指精神活动">神欲</u>行。依乎<u title="指牛的生理上的天然结构">天理</u>，<u title="击入大的缝隙">批大<ruby>郤<rp>(</rp><rt lang="zh-Latn">xì</rt><rp>)</rp></ruby></u>，<u title="顺着（骨节间的）空处进刀">导大<ruby>窾<rp>(</rp><rt lang="zh-Latn">kuǎn</rt><rp>)</rp></ruby></u>，<u title="依">因</u>其<u title="指牛体本来的结构">固然</u>，技经肯<ruby>綮<rp>(</rp><rt lang="zh-Latn">qìng</rt><rp>)</rp></ruby>之未尝，而况大<ruby>軱<rp>(</rp><rt lang="zh-Latn">gū</rt><rp>)</rp></ruby>乎！良庖岁更刀，割也；族庖月更刀，折也。今臣之刀十九年矣，所解数千牛矣，而刀刃若新发于<ruby>硎<rp>(</rp><rt lang="zh-Latn">xíng</rt><rp>)</rp></ruby>。彼节者有间，而刀刃者无厚；以无厚入有间，恢恢乎其于<em>游刃必有余地</em>矣，是以十九年而刀刃若新发于硎。虽然，每至于族，吾见其难为，<ruby>怵<rp>(</rp><rt lang="zh-Latn">chù</rt><rp>)</rp></ruby>然为戒，视为止，行为迟。动刀甚微，<ruby>謋<rp>(</rp><rt lang="zh-Latn">huò</rt><rp>)</rp></ruby>然已解，如土委地。提刀而立，为之四顾，为之<ruby>踌<rp>(</rp><rt lang="zh-Latn">chóu</rt><rp>)</rp>躇<rp>(</rp><rt lang="zh-Latn">chú</rt><rp>)</rp></ruby>满志，善刀而藏之。」</p>
                <p>文惠君曰：「善哉！吾闻庖丁之言，得养生焉。」</p>
              </div>
            </section>
          </details>

          <h3 id="example-columns">
            多栏排版<a v-anchor="'#example-columns'" class="anchor">#</a>
          </h3>
          <p>预置多种多栏布局类，可以按栏数或每栏行宽进行设置。</p>
          <details>
            <summary>如何使用？</summary>
            <p>为容器元素<code>&lt;div class=&quot;chinese&quot;&gt;</code>添加名为<code>chinese--columns-2</code>的class即可实现双栏排版：</p>
            <pre><code>&lt;div class=&quot;chinese chinese--columns-2&quot;&gt;...&lt;/div&gt;</code></pre>
            <table>
              <thead>
                <tr>
                  <th style="width: 100px;">
                    方式
                  </th>
                  <th style="width: 200px;">
                    对应类名
                  </th>
                  <th style="width: 300px;">
                    可选数值
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>按栏目数量</td>
                  <td><code>chinese--columns-3</code></td>
                  <td>不限，但是建议不超过5</td>
                </tr>
                <tr>
                  <td>按每栏行宽</td>
                  <td><code>chinese--columns-width-16</code></td>
                  <td>建议为4的倍数</td>
                </tr>
              </tbody>
            </table>
          </details>
          <details open>
            <summary>示例</summary>
            <NCard>
              <figure class="card card--multi-column">
                <section class="chinese--columns-2">
                  <p>先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。</p>
                  <p>宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理；不宜偏私，使内外异法也。</p>
                  <p>侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下：愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。</p>
                  <p>将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。</p>
                  <p>亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。</p>
                  <p>臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。</p>
                  <p>先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。</p>
                  <p>愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。</p>
                  <p>今当远离，临表涕零，不知所言。</p>
                </section>
                <figcaption>多栏排版演示</figcaption>
              </figure>
            </NCard>
          </details>

          <h3 id="example-vertical">
            竖排排版<a v-anchor="'#example-vertical'" class="anchor">#</a>
          </h3>
          <p>预置传统的竖排（直排）方向排版，同样贴合栅格。</p>
          <details>
            <summary>如何使用？</summary>
            <p>为容器元素<code>&lt;div class=&quot;chinese&quot;&gt;</code>添加名为<code>chinese--vertical</code>的class即可实现竖排布局：</p>
            <pre><code>&lt;div class=&quot;chinese chinese--vertical&quot;&gt;...&lt;/div&gt;</code></pre>
          </details>
          <details open>
            <summary>示例</summary>
            <NCard>
              <figure class="card card--vertical">
                <div class="card__vertical-container">
                  <section class="chinese--vertical chinese--ancient">
                    <h1>出師表</h1>
                    <p class="chinese-small">
                      作者：<abbr title="字孔明">諸葛亮</abbr>（181年－234年10月8日）
                    </p>
                    <p>先帝創業未半，而中道崩殂；今天下三分，益州疲弊，此誠危急存亡之秋也﹗然侍衞之臣，不懈於內；忠志之士，忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。</p>
                    <p>誠宜開張聖聽，以光先帝遺德，恢弘志士之氣﹔不宜妄自菲薄，引喻失義，以塞忠諫之路也。</p>
                    <p>宮中、府中，俱為一體；陟罰臧否，不宜異同。若有作姦、犯科，及為忠善者，宜付有司，論其刑賞，以昭陛下平明之治；不宜偏私，使內外異法也。</p>
                    <p>侍中、侍郎郭攸之、費禕、董允等，此皆良實，志慮忠純，是以先帝簡拔以遺陛下。愚以為宮中之事，事無大小，悉以咨之，然後施行，必能裨補闕漏，有所廣益。將軍向寵，性行淑均，曉暢軍事，試用於昔日，先帝稱之曰「能」，是以眾議舉寵為督。愚以為營中之事，悉以咨之，必能使行陣和睦，優劣得所。</p>
                    <p>親賢臣，遠小人，此先漢所以興隆也﹔親小人，遠賢臣，此後漢所以傾頹也。先帝在時，每與臣論此事，未嘗不歎息痛恨於桓、靈也！侍中、尚書、長史、參軍，此悉貞良死節之臣，願陛下親之、信之，則漢室之隆，可計日而待也。</p>
                    <p>臣本布衣，躬耕於南陽，苟全性命於亂世，不求聞達於諸侯。先帝不以臣卑鄙，猥自枉屈，三顧臣於草廬之中，諮臣以當世之事；由是感激，遂許先帝以驅馳。後值傾覆，受任於敗軍之際，奉命於危難之間，爾來二十有一年矣。先帝知臣謹慎，故臨崩寄臣以大事也。受命以來，夙夜憂歎，恐託付不效，以傷先帝之明。故五月渡瀘，深入不毛。今南方已定，兵甲已足，當獎率三軍，北定中原，庶竭駑鈍，攘除姦凶，興復漢室，還於舊都。此臣所以報先帝而忠陛下之職分也。至於斟酌損益，進盡忠言，則攸之、禕、允之任也。</p>
                    <p>願陛下託臣以討賊興復之效；不效，則治臣之罪，以告先帝之靈。若無興德之言，則責攸之、禕、允等之慢，以彰其咎。陛下亦宜自謀，以諮諏善道，察納雅言，深追先帝遺詔。臣不勝受恩感激。今當遠離，臨表涕零，不知所言！</p>
                  </section>
                </div>
                <figcaption>竖排排版演示</figcaption>
              </figure>
            </NCard>
          </details>

          <hr>

          <h2 id="guidelines">
            设计原则<a v-anchor="'#guidelines'" class="anchor">#</a>
          </h2>
          <p>它不作为一个CSS Reset出现，而是根据通行的中文排版规范，对网页正文区域进行排版样式增强。</p>
          <h3>文字</h3>
          <p>参考《中文排版需求<sup><a id="ref-01" v-anchor="'#fn-01'">[1]</a></sup>》中描述的常用书籍排版字体，提供了黑体、宋体和<u title="以正文宋体、标题楷体构成的搭配">传统</u>三种字体风格，前两者分别对应无衬线、衬线字体族。文字默认采用16px作为标准字号。在标题等文字较大的情况下，会适当地增加字间距以便获得更好地可读性。</p>
          <details>
            <summary>查看字体风格详细对照表</summary>
            <section class="section">
              <table>
                <caption>各字体族下不同标签对应的字体</caption>
                <thead>
                  <tr>
                    <td style="width: 60px;" />
                    <th style="width: 60px;">
                      黑体
                    </th>
                    <th style="width: 60px;">
                      宋体
                    </th>
                    <th style="width: 60px;">
                      传统
                    </th>
                    <th style="width: 380px;">
                      备注
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>标题</th>
                    <td rowspan="7">
                      黑体
                    </td>
                    <td rowspan="7">
                      宋体
                    </td>
                    <td>楷体</td>
                    <td>
                      <section>
                        <h1>记忆中的站台</h1>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>正文</th>
                    <td>宋体</td>
                    <td>
                      <section>
                        <p>那是一个风雨交加的夜晚。</p>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>引用</th>
                    <td>楷体</td>
                    <td>
                      <section>
                        <blockquote>锣鼓喧天，鞭炮齐鸣，红旗招展，人山人海。</blockquote>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>强调</th>
                    <td>宋体</td>
                    <td>
                      <section>
                        <p>父亲<em>特意</em>嘱咐了我两句。</p>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>对话</th>
                    <td>楷体</td>
                    <td>
                      <section>
                        <p>他说：<q>我买几个橘子去。你就在此地，不要走动。</q></p>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>图例</th>
                    <td>黑体</td>
                    <td>
                      <section>
                        <figure>
                          <!--                      <img src="./assets/orange.jpg" alt="" style="width: 200px;"> -->
                          <figcaption>橘子</figcaption>
                        </figure>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>表头</th>
                    <td>黑体</td>
                    <td>
                      <section>
                        <table>
                          <caption>当时的情形</caption>
                          <tr>
                            <th>角色</th>
                            <th>物品</th>
                          </tr>
                          <tr>
                            <td>父亲</td>
                            <td>橘子</td>
                          </tr>
                          <tr>
                            <td>我</td>
                            <td>车票</td>
                          </tr>
                        </table>
                      </section>
                    </td>
                  </tr>
                  <tr>
                    <th>角标</th>
                    <td>黑体</td>
                    <td>黑体</td>
                    <td>黑体</td>
                    <td>鲁迅<sup>[1]</sup>曾经没有说过</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </details>
          <h3>标点</h3>
          <p>参考《中文排版需求》制定符号样式。唯一的差异在于简体中文一律采用直角引号（「」）替代弯引号（“”），这样可以保持字符等宽。</p>
          <h3>间距</h3>
          <p>为保持页面元素总是贴合垂直栅格，块级元素（段落、列表、表格等）采用一行行高作为底边距，半行行高作为顶边距。标题根据亲密性原则采用相反的边距设计。</p>

          <hr>

          <h2 id="appendix">
            附录<a v-anchor="'#appendix'" class="anchor">#</a>
          </h2>
          <h3 id="tags">
            标签示例表<a v-anchor="'#tags'" class="anchor">#</a>
          </h3>
          <details open>
            <summary>查看标签示例表</summary>
            <section class="section">
              <table>
                <caption>常用标签样式示例表</caption>
                <tr>
                  <th style="width: 72px;">
                    类型
                  </th>
                  <th style="width: 320px;">
                    标签
                  </th>
                  <th style="width: 240px;">
                    效果
                  </th>
                </tr>
                <tr>
                  <td>链接</td>
                  <td><code>&lt;a href=&quot;https://github.com/kirklin/unocss-preset-chinese&quot; title=&quot;赫蹏&quot;&gt;unocss-preset-chinese&lt;/a&gt;</code></td>
                  <td><a href="https://github.com/kirklin/unocss-preset-chinese" title="unocss-preset-chinese">unocss-preset-chinese</a></td>
                </tr>
                <tr>
                  <td>缩写</td>
                  <td><code>&lt;abbr title=&quot;Cascading Style Sheets&quot;&gt;CSS&lt;/abbr&gt;</code></td>
                  <td><abbr title="Cascading Style Sheets">CSS</abbr></td>
                </tr>
                <tr>
                  <td>代码</td>
                  <td><code>&lt;code&gt;.chinese { star: 5; }&lt;/code&gt;</code></td>
                  <td><code>.chinese { star: 5; }</code></td>
                </tr>
                <tr>
                  <td>专名号</td>
                  <td><code>此时来自&lt;u title=&quot;位于山东省聊城市阳谷县城东&quot;&gt;景阳冈&lt;/u&gt;的&lt;u&gt;武松&lt;/u&gt;大喝一声：&lt;q&gt;纳命来！&lt;/q&gt;</code></td>
                  <td>此时来自<u title="位于山东省聊城市阳谷县城东">景阳冈</u>的<u>武松</u>大喝一声：<q>纳命来！</q></td>
                </tr>
                <tr>
                  <td>文本变动</td>
                  <td><code>我写错&lt;del datetime=&quot;17:00:00&quot;&gt;拉&lt;/del&gt;&lt;ins datetime=&quot;18:15:00&quot;&gt;啦&lt;/ins&gt;！</code></td>
                  <td>我写错<del datetime="17:00:00">拉</del><ins datetime="18:15:00">啦</ins>！</td>
                </tr>
                <tr>
                  <td>文本更新</td>
                  <td><code>在陌生的城市里迷路，所以最后我们决定跟着&lt;s&gt;导航&lt;/s&gt;地图。</code></td>
                  <td>在陌生的城市里迷路，所以最后我们决定跟着<s>导航</s>地图。</td>
                </tr>
                <tr>
                  <td>引号</td>
                  <td><code>她说：&lt;q&gt;嘿，你好。&lt;/q&gt;</code></td>
                  <td>她说：<q>嘿，你好。</q></td>
                </tr>
                <tr>
                  <td>术语</td>
                  <td><code>在固定版面内，&lt;dfn&gt;排版&lt;/dfn&gt;(英语：Typesetting) 摆置各种不同类型的资料。</code></td>
                  <td>在固定版面内，<dfn>排版</dfn>(英语：Typesetting) 摆置各种不同类型的资料。</td>
                </tr>
                <tr>
                  <td>标记</td>
                  <td><code>这个公式<mark>很重要</mark>，请记住。</code></td>
                  <td>这个公式<mark>很重要</mark>，请记住。</td>
                </tr>
                <tr>
                  <td>强调</td>
                  <td><code>相信自己，<em>你可以做到</em>！</code></td>
                  <td>相信自己，<em>你可以做到</em>！</td>
                </tr>
                <tr>
                  <td>着重号</td>
                  <td><code>我们<span class="chinese-em">绝不会</span>放弃。</code></td>
                  <td>我们<span class="chinese-em">绝不会</span>放弃。</td>
                </tr>
              </table>
            </section>
          </details>
        </article>
      </NCard>
    </NScrollbar>
  </PageWrapper>
</template>

<style scoped>
a {
  color: hsl(217, 89%, 61%);
  text-decoration: none;
  @apply cursor-pointer;
}
.article {
  margin-inline-start: auto;
  margin-inline-end: auto;
}
.article__nav ol {
  margin-block-start: 24px;
  margin-block-end: 24px;
}
.anchor {
  margin-inline-start: 0.25em;
}
.article .anchor {
  position: absolute;
  left: -1em;
  width: 1em;
  margin-inline-start: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  line-height: inherit;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s linear;
}
.article .anchor:hover {
  text-decoration: none;
  border: 0;
}
.article h1,
.article h2,
.article h3,
.article h4,
.article h5,
.article h6 {
  position: relative;
}
.article h1:hover .anchor,
.article h2:hover .anchor,
.article h3:hover .anchor,
.article h4:hover .anchor,
.article h5:hover .anchor,
.article h6:hover .anchor {
  opacity: 1;
}
.card {
  position: relative;
  width: 100%;
}
.article .card {
  text-align: left;
}
.card > figcaption {
  display: inline-block;
  margin-block-start: 16px;
  padding-block-start: 4px;
  padding-block-end: 3px;
  padding-inline-start: 0;
  padding-inline-end: 72px;
  line-height: 24px;
}
.card__vertical-container {
  box-sizing: border-box;
  width: 100%;
  height: 30em;
  overflow: auto;
  writing-mode: vertical-rl;
}
</style>
