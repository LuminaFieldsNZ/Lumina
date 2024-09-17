// Inside the `u` function where results are processed and drawn
async function u() {
  var d, r, c;
  if (!a.video.paused) {
    let l = e.next(e.result),
        w = await e.image(a.video);
    e.draw.canvas(w.canvas, a.canvas);
    
    // Extract emotion scores
    const emotions = e.result.emotion;
    let happyScore = emotions && emotions.happy ? emotions.happy : 0;
    let veryHappyScore = emotions && emotions.veryHappy ? emotions.veryHappy : 0;
    
    // Create labels based on emotion scores
    let emotionLabels = [];
    if (happyScore > 0.5) {
      emotionLabels.push('Happy');
    }
    if (veryHappyScore > 0.5) {
      emotionLabels.push('Very Happy');
      alert('Very Happy');
    }
    
    let p = {
      bodyLabels: `person confidence [score] and ${(c = (r = (d = e.result) == null ? void 0 : d.body) == null ? void 0 : r[0]) == null ? void 0 : c.keypoints.length} keypoints`,
      emotionLabels: emotionLabels.join(', ')
    };
    
    await e.draw.all(a.canvas, l, p);
    g(l.performance);
  }
  let t = e.now();
  s.drawFPS = Math.round(1e3 * 1e3 / (t - n.draw)) / 1e3;
  n.draw = t;
  i(a.video.paused ? "paused" : `fps: ${s.detectFPS.toFixed(1).padStart(5, " ")} detect | ${s.drawFPS.toFixed(1).padStart(5, " ")} draw`);
  setTimeout(u, 30);
}
