// Fragmentos de código del fondo del hero (HTML ya resaltado, copiados de hero.html).
// Clases: k = palabra clave, s = string, f = función/tipo, c = comentario, n = número/literal, p = puntuación.
export const snippets: string[] = [
  `<span class="k">import</span> <span class="p">{</span> db <span class="p">}</span> <span class="k">from</span> <span class="s">"./db"</span><span class="p">;</span>
<span class="k">import</span> <span class="p">{</span> bookings <span class="p">}</span> <span class="k">from</span> <span class="s">"./schema"</span><span class="p">;</span>

<span class="c">// day availability</span>
<span class="k">export async function</span> <span class="f">getSlots</span><span class="p">(</span>date<span class="p">:</span> <span class="f">string</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">const</span> taken <span class="p">=</span> <span class="k">await</span> db
    <span class="p">.</span><span class="f">select</span><span class="p">()</span>
    <span class="p">.</span><span class="f">from</span><span class="p">(</span>bookings<span class="p">)</span>
    <span class="p">.</span><span class="f">where</span><span class="p">(</span><span class="f">eq</span><span class="p">(</span>bookings<span class="p">.</span>date<span class="p">,</span> date<span class="p">));</span>
  <span class="k">return</span> <span class="f">allSlots</span><span class="p">(</span>date<span class="p">).</span><span class="f">filter</span><span class="p">(</span>s <span class="p">=></span> <span class="p">!</span>taken<span class="p">.</span><span class="f">some</span><span class="p">(</span>t <span class="p">=></span> t<span class="p">.</span>slot <span class="p">===</span> s<span class="p">));</span>
<span class="p">}</span>
`,
  `<span class="k">export function</span> <span class="f">BookingForm</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">const</span> <span class="p">[</span>slot<span class="p">,</span> setSlot<span class="p">]</span> <span class="p">=</span> <span class="f">useState</span><span class="p">&lt;</span><span class="f">string</span> <span class="p">|</span> <span class="n">null</span><span class="p">&gt;(</span><span class="n">null</span><span class="p">);</span>

  <span class="k">async function</span> <span class="f">submit</span><span class="p">(</span>e<span class="p">:</span> <span class="f">FormEvent</span><span class="p">)</span> <span class="p">{</span>
    e<span class="p">.</span><span class="f">preventDefault</span><span class="p">();</span>
    <span class="k">await</span> <span class="f">fetch</span><span class="p">(</span><span class="s">"/api/bookings"</span><span class="p">,</span> <span class="p">{</span>
      method<span class="p">:</span> <span class="s">"POST"</span><span class="p">,</span>
      body<span class="p">:</span> <span class="f">JSON</span><span class="p">.</span><span class="f">stringify</span><span class="p">({</span> slot <span class="p">}),</span>
    <span class="p">});</span>
  <span class="p">}</span>
  <span class="k">return</span> <span class="p">&lt;</span><span class="f">form</span> onSubmit<span class="p">={</span>submit<span class="p">}</span> <span class="p">/&gt;;</span>
<span class="p">}</span>
`,
  `<span class="c">// routes</span>
app<span class="p">.</span><span class="f">post</span><span class="p">(</span><span class="s">"/api/bookings"</span><span class="p">,</span> <span class="k">async</span> <span class="p">(</span>req<span class="p">,</span> res<span class="p">)</span> <span class="p">=></span> <span class="p">{</span>
  <span class="k">const</span> data <span class="p">=</span> schema<span class="p">.</span><span class="f">parse</span><span class="p">(</span>req<span class="p">.</span>body<span class="p">);</span>
  <span class="k">await</span> db<span class="p">.</span><span class="f">insert</span><span class="p">(</span>bookings<span class="p">).</span><span class="f">values</span><span class="p">(</span>data<span class="p">);</span>
  <span class="k">await</span> <span class="f">sendConfirmation</span><span class="p">(</span>data<span class="p">);</span>
  res<span class="p">.</span><span class="f">status</span><span class="p">(</span><span class="n">201</span><span class="p">).</span><span class="f">json</span><span class="p">({</span> ok<span class="p">:</span> <span class="n">true</span> <span class="p">});</span>
<span class="p">});</span>

<span class="c">// i18n</span>
<span class="k">const</span> lang <span class="p">=</span> <span class="f">detect</span><span class="p">(</span>navigator<span class="p">.</span>language<span class="p">)</span> <span class="p">??</span> <span class="s">"it"</span><span class="p">;</span>
<span class="k">const</span> t <span class="p">=</span> <span class="f">useTranslation</span><span class="p">(</span>lang<span class="p">);</span>
`,
  `<span class="k">export const</span> appointments <span class="p">=</span> <span class="f">pgTable</span><span class="p">(</span><span class="s">"appointments"</span><span class="p">,</span> <span class="p">{</span>
  id<span class="p">:</span> <span class="f">serial</span><span class="p">(</span><span class="s">"id"</span><span class="p">).</span><span class="f">primaryKey</span><span class="p">(),</span>
  name<span class="p">:</span> <span class="f">text</span><span class="p">(</span><span class="s">"name"</span><span class="p">).</span><span class="f">notNull</span><span class="p">(),</span>
  date<span class="p">:</span> <span class="f">date</span><span class="p">(</span><span class="s">"date"</span><span class="p">).</span><span class="f">notNull</span><span class="p">(),</span>
  slot<span class="p">:</span> <span class="f">varchar</span><span class="p">(</span><span class="s">"slot"</span><span class="p">,</span> <span class="p">{</span> length<span class="p">:</span> <span class="n">5</span> <span class="p">}),</span>
  status<span class="p">:</span> <span class="f">text</span><span class="p">(</span><span class="s">"status"</span><span class="p">).</span><span class="f">default</span><span class="p">(</span><span class="s">"confirmed"</span><span class="p">),</span>
<span class="p">});</span>

<span class="c">/* mobile first */</span>
<span class="k">@media</span> <span class="p">(</span>min-width<span class="p">:</span> <span class="n">768px</span><span class="p">)</span> <span class="p">{</span>
  <span class="f">.panel</span> <span class="p">{</span> display<span class="p">:</span> grid<span class="p">;</span> gap<span class="p">:</span> <span class="n">24px</span><span class="p">;</span> <span class="p">}</span>
<span class="p">}</span>
`,
];
