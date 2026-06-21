// ─── SVG Builder ────────────────────────────────────────────────────────────
const icon = (body, size = 48, vb = '0 0 48 48') =>
  `<svg width="${size}" height="${size}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`

// ─── Muscle Icons ────────────────────────────────────────────────────────────
const muscleIcons = {
  Dada: icon(`
    <path d="M8 16 Q10 8 24 12 Q38 8 40 16 L40 30 Q36 38 24 35 Q12 38 8 30 Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <line x1="24" y1="12" x2="24" y2="35" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
    <path d="M10 20 Q14 17 20 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M38 20 Q34 17 28 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  `),
  Punggung: icon(`
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 10 Q14 12 8 18 Q6 22 10 24 Q16 22 24 20" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/>
    <path d="M24 10 Q34 12 40 18 Q42 22 38 24 Q32 22 24 20" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/>
    <path d="M24 24 Q14 26 10 32 Q9 36 13 37 Q18 35 24 33" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.4"/>
    <path d="M24 24 Q34 26 38 32 Q39 36 35 37 Q30 35 24 33" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="24" cy="14" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="20" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="26" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="32" r="1.5" fill="currentColor" opacity="0.4"/>
  `),
  Kaki: icon(`
    <path d="M14 6 Q11 6 10 10 L8 28 Q8 32 11 33 L13 42 Q14 44 16 43 L17 33 Q19 32 19 28 L18 10 Q17 6 14 6Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>
    <path d="M34 6 Q37 6 38 10 L40 28 Q40 32 37 33 L35 42 Q34 44 32 43 L31 33 Q29 32 29 28 L30 10 Q31 6 34 6Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>
    <path d="M13 10 Q14 8 15 12 Q15 20 14 26" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
    <path d="M35 10 Q34 8 33 12 Q33 20 34 26" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
    <path d="M13 6 Q14 4 15 4 Q20 4 24 5 Q28 4 33 4 Q34 4 35 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  `),
  Bokong: icon(`
    <path d="M8 22 Q8 10 18 8 Q24 6 24 14 Q24 6 30 8 Q40 10 40 22 Q40 36 24 42 Q8 36 8 22Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M24 14 Q24 28 24 42" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
    <path d="M10 24 Q14 18 20 20 Q22 24 18 28 Q14 30 10 24Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
    <path d="M38 24 Q34 18 28 20 Q26 24 30 28 Q34 30 38 24Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
  `),
  Bahu: icon(`
    <path d="M6 28 Q6 18 14 14 Q20 10 24 16 Q24 10 28 10 Q38 14 42 24 Q40 32 34 30 Q28 24 24 24 Q20 24 14 30 Q8 32 6 28Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M14 14 Q10 20 12 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <path d="M24 16 Q22 22 24 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <path d="M34 14 Q38 20 36 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <ellipse cx="24" cy="14" rx="5" ry="3" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.2"/>
  `),
  Bisep: icon(`
    <path d="M14 38 L15 28 Q14 18 18 12 Q22 6 26 8 Q32 10 32 18 Q32 24 28 28 L26 38Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M18 12 Q16 16 18 20 Q22 14 26 16 Q28 18 26 22"
      stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M26 8 Q30 10 30 16 Q30 22 26 26" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
    <line x1="14" y1="38" x2="26" y2="38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  `),
  Trisep: icon(`
    <path d="M16 8 Q14 8 13 12 L12 22 Q12 28 16 32 L18 38 Q20 42 24 42 Q28 42 30 38 L32 32 Q36 28 36 22 L35 12 Q34 8 32 8Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M18 10 Q16 16 18 22 Q20 26 24 28 Q28 26 30 22 Q32 16 30 10"
      stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.6"/>
    <path d="M16 14 Q14 18 15 24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    <path d="M32 14 Q34 18 33 24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    <path d="M24 10 Q22 16 24 28" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
  `),
  Perut: icon(`
    <rect x="10" y="8"  width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="8"  width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="10" y="20" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="20" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="10" y="32" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="32" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
  `),
  Kardio: icon(`
    <path d="M24 38 L10 24 Q4 16 10 10 Q16 4 22 10 L24 12 L26 10 Q32 4 38 10 Q44 16 38 24 Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
    <polyline points="6,26 12,26 15,20 19,34 22,26 25,28 27,24 30,24 34,26 42,26"
      stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `),
}

// ─── Exercise Icons (PNG) ─────────────────────────────────────────────────────
// Letakkan file PNG di: public/images/exercises/
const exerciseIcons = {
  // ── NO EQUIPMENT ─────────────────────────────────────────
  'Push Up':                '/images/exercises/pushup.png',
  'Wide Push-Up':           '/images/exercises/widepushup.png',
  'Diamond Push-Up':        '/images/exercises/diamondpushup.png',
  'Decline Push-Up':        '/images/exercises/declinepushup.png',
  'Incline Push-Up':        '/images/exercises/inclinepushup.png',
  'Pike Push-Up':           '/images/exercises/pikepushup.png',
  'Close Grip Push-Up':     '/images/exercises/closegrippushup.png',
  'Pull Up':                '/images/exercises/pullup.png',
  'Chin-Up':                '/images/exercises/chinup.png',
  'Superman Hold':          '/images/exercises/supermanhold.png',
  'Back Extension':         '/images/exercises/backextension.png',
  'Bird Dog':               '/images/exercises/birddog.png',
  'Table Row':              '/images/exercises/tablerow.png',
  'Inverted Row':           '/images/exercises/invertedrow.png',
  'Shoulder Taps':          '/images/exercises/shouldertaps.png',
  'Wall Push-Up':           '/images/exercises/wallpushup.png',
  'Arm Circle':             '/images/exercises/armcircle.png',
  'Bicep Isometric Curl':   '/images/exercises/bicepiso.png',
  'Towel Curl':             '/images/exercises/towelcurl.png',
  'Tricep Dips':            '/images/exercises/tricepdips.png',
  'Bench Dips':             '/images/exercises/benchdips.png',
  'Crunch':                 '/images/exercises/crunch.png',
  'Sit-Up':                 '/images/exercises/situp.png',
  'Plank':                  '/images/exercises/plank.png',
  'Bicycle Crunch':         '/images/exercises/bicyclecrunch.png',
  'Leg Raise':              '/images/exercises/legraise.png',
  'Russian Twist':          '/images/exercises/russiantwist.png',
  'Mountain Climber':       '/images/exercises/mountainclimber.png',
  'Flutter Kick':           '/images/exercises/flutterkick.png',
  'Side Plank':             '/images/exercises/sideplank.png',
  'V-Up':                   '/images/exercises/vup.png',
  'Squat':                  '/images/exercises/squat.png',
  'Jump Squat':             '/images/exercises/jumpsquat.png',
  'Squat Jump':             '/images/exercises/squatjump.png',
  'Lunge':                  '/images/exercises/lunge.png',
  'Lunges':                 '/images/exercises/lunges.png',
  'Reverse Lunge':          '/images/exercises/reverselunge.png',
  'Glute Bridge':           '/images/exercises/glutebridge.png',
  'Wall Sit':               '/images/exercises/wallsit.png',
  'Calf Raise':             '/images/exercises/calfraise.png',
  'Donkey Kick':            '/images/exercises/donkeykick.png',
  'Fire Hydrant':           '/images/exercises/firehydrant.png',
  'Step-Up':                '/images/exercises/stepup.png',
  'Sumo Squat':             '/images/exercises/sumosquat.png',
  'Lateral Lunge':          '/images/exercises/laterallunge.png',
  'Burpee':                 '/images/exercises/burpee.png',
  'Jumping Jack':           '/images/exercises/jumpingjack.png',
  'High Knees':             '/images/exercises/highknees.png',
  'Lompat Tali (Tanpa Tali)': '/images/exercises/lompattali.png',
  // ── WITH DUMBBELL ─────────────────────────────────────────
  'DB Chest Press':         '/images/exercises/dbchestpress.png',
  'DB Incline Press':       '/images/exercises/dbinclinepress.png',
  'DB Flye':                '/images/exercises/dbflye.png',
  'DB Pullover':            '/images/exercises/dbpullover.png',
  'DB Push-Up (Handles)':   '/images/exercises/dbpushup.png',
  'DB Row':                 '/images/exercises/dbrow.png',
  'DB Bent Over Row':       '/images/exercises/dbbentoverrow.png',
  'DB Deadlift':            '/images/exercises/dbdeadlift.png',
  'DB Shrug':                '/images/exercises/dbshrug.png',
  'DB Reverse Flye':        '/images/exercises/dbreverseflye.png',
  'DB Romanian Deadlift':   '/images/exercises/dbromaniandeadlift.png',
  'DB Shoulder Press':      '/images/exercises/dbshoulderpress.png',
  'DB Lateral Raise':       '/images/exercises/dblateralraise.png',
  'DB Front Raise':         '/images/exercises/dbfrontraise.png',
  'DB Arnold Press':        '/images/exercises/dbarnoldpress.png',
  'DB Upright Row':         '/images/exercises/dbuprightrow.png',
  'DB Bicep Curl':          '/images/exercises/dbbicepcurl.png',
  'DB Hammer Curl':         '/images/exercises/dbhammercurl.png',
  'DB Concentration Curl':  '/images/exercises/dbconcentrationcurl.png',
  'DB Alternating Curl':    '/images/exercises/dbalternatingcurl.png',
  'DB Zottman Curl':        '/images/exercises/dbzottmancurl.png',
  'DB Overhead Tricep Extension': '/images/exercises/dboverheadtricep.png',
  'DB Skull Crusher':       '/images/exercises/dbskullcrusher.png',
  'DB Kickback':            '/images/exercises/dbkickback.png',
  'DB Close-Grip Press':    '/images/exercises/dbclosegrippress.png',
  'DB Tate Press':          '/images/exercises/dbtatepress.png',
  'DB Russian Twist':       '/images/exercises/dbrussiantwist.png',
  'DB Weighted Crunch':     '/images/exercises/dbweightedcrunch.png',
  'DB Side Bend':           '/images/exercises/dbsidebend.png',
  'DB Woodchop':            '/images/exercises/dbwoodchop.png',
  'DB Goblet Squat':        '/images/exercises/dbgobletsquat.png',
  'DB Lunge':               '/images/exercises/dblunge.png',
  'DB Bulgarian Split Squat': '/images/exercises/dbbulgariansplitsquat.png',
  'DB Sumo Squat':          '/images/exercises/dbsumosquat.png',
  'DB Hip Thrust':          '/images/exercises/dbhipthrust.png',
  'DB Step-Up':             '/images/exercises/dbstepup.png',
  'DB Calf Raise':          '/images/exercises/dbcalfraise.png',
  'DB Lateral Lunge':       '/images/exercises/dblaterallunge.png',
  'DB Thruster':            '/images/exercises/dbthruster.png',
  'DB Renegade Row':        '/images/exercises/dbrenegaderow.png',
  'DB Swing':               '/images/exercises/dbswing.png',
  'DB Clean and Press':     '/images/exercises/dbcleanandpress.png',
  'DB Burpee':              '/images/exercises/dbburpee.png',
  // ── LEGACY (original bukuData keys) ──────────────────────
  'Deadlift':               '/images/exercises/deadlift.png',
  'Dumbbell Curl':          '/images/exercises/dumbbellcurl.png',
  'Tricep Dip':             '/images/exercises/tricepdip.png',
  'Hip Thrust':             '/images/exercises/hipthrust.png',
  'Shoulder Press':         '/images/exercises/shoulderpress.png',
}

// ─── Muscle Images (foto anatomi, untuk banner kartu Tab Otot) ───────────────
// Letakkan file gambar di: public/images/muscles/
// Format bebas (jpg/png/webp). Disarankan rasio landscape ~16:9 atau 4:3.
const muscleImages = {
  Dada:     '/images/muscles/dada.png',
  Punggung: '/images/muscles/punggung.png',
  Kaki:     '/images/muscles/kaki.png',
  Bokong:   '/images/muscles/bokong.png',
  Bahu:     '/images/muscles/bahu.png',
  Bisep:    '/images/muscles/bisep.png',
  Trisep:   '/images/muscles/trisep.png',
  Perut:    '/images/muscles/perut.png',
  Kardio:   '/images/muscles/kardio.png',
}

// ─── Nutrisi Icons ───────────────────────────────────────────────────────────
const nutrisiIcons = {
  timing: icon(`
    <circle cx="24" cy="24" r="18" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="2"/>
    <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
    <line x1="24" y1="24" x2="24" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="24" x2="33" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="8" x2="24" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="24" x2="38" y2="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  `),
  hidrasi: icon(`
    <path d="M24 6 Q36 18 36 28 A12 12 0 0 1 12 28 Q12 18 24 6Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>
    <path d="M20 32 Q24 28 28 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  `),
  pemulihan: icon(`
    <path d="M30 10 Q20 12 18 24 Q16 36 28 40 Q16 42 10 34 Q4 22 12 14 Q18 8 30 10Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>
    <circle cx="36" cy="14" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="42" cy="22" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="38" cy="30" r="1" fill="currentColor" opacity="0.3"/>
  `),
  kalori: icon(`
    <path d="M28 6 L14 26 L22 26 L18 42 L36 20 L26 20 Z"
      fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  `),
  makanan: icon(`
    <path d="M8 40 Q16 20 38 8 Q38 30 20 36 Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="M8 40 Q18 30 38 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  `),
  suplemen: icon(`
    <rect x="17" y="6" width="14" height="6" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 12 Q10 16 10 20 L10 38 Q10 42 14 42 L34 42 Q38 42 38 38 L38 20 Q38 16 34 12Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
    <line x1="10" y1="26" x2="38" y2="26" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
    <line x1="24" y1="20" x2="24" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="26" x2="30" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  `),
}

// ─── Makronutrien Icons ──────────────────────────────────────────────────────
const makroIcons = {
  Protein:     '/images/makro/protein.png',
  Karbohidrat: '/images/makro/karbohidrat.png',
  Lemak:       '/images/makro/lemak.png',
}

// ─── Exercises Data ──────────────────────────────────────────────────────────
const exercises = [

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — DADA
  // ════════════════════════════════════════════════════════
  { name: 'Push Up',          icon: exerciseIcons['Push Up'],          muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'No Equipment', level: 'beginner',     met: 8.0,  color: '#eab308', desc: 'Gerakan dasar mendorong tubuh dari lantai. Efektif melatih otot dada, trisep, dan bahu secara bersamaan.', steps: ['Posisi plank dengan tangan selebar bahu','Turunkan dada hingga hampir menyentuh lantai','Siku membentuk sudut 45° dari tubuh','Dorong kembali ke atas dengan kuat','Jaga tubuh lurus dari kepala hingga tumit'], muscles: ['Pectoralis Major','Deltoid Anterior','Triceps Brachii','Core'], tip: 'Jaga siku tidak terlalu keluar. Fokus squeeze dada di puncak gerakan.' },
  { name: 'Wide Push-Up',     icon: exerciseIcons['Wide Push-Up'],     muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'No Equipment', level: 'beginner',     met: 8.0,  color: '#eab308', desc: 'Push-up dengan tangan lebih lebar dari bahu. Fokus lebih besar pada otot dada bagian luar.', steps: ['Tangan lebih lebar dari bahu','Jari mengarah sedikit keluar','Turunkan dada ke lantai','Dorong naik dengan kuat','Jaga tubuh tetap lurus'], muscles: ['Pectoralis Major','Deltoid Anterior'], tip: 'Semakin lebar tangan, semakin besar fokus ke dada luar.' },
  { name: 'Diamond Push-Up',  icon: exerciseIcons['Diamond Push-Up'],  muscle: 'Trisep',   muscleIcon: muscleIcons['Trisep'],   equipment: 'No Equipment', level: 'intermediate', met: 8.5,  color: '#fb923c', desc: 'Tangan membentuk berlian di bawah dada. Sangat efektif mengaktifkan trisep dan dada bagian tengah.', steps: ['Bentuk berlian dengan ibu jari dan telunjuk','Posisi di bawah dada','Turunkan dengan siku rapat ke badan','Dorong naik kuat-kuat','Fokus squeeze trisep'], muscles: ['Triceps Brachii','Pectoralis Major'], tip: 'Ini push-up paling efektif untuk trisep. Jaga siku tidak keluar.' },
  { name: 'Decline Push-Up',  icon: exerciseIcons['Decline Push-Up'],  muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'No Equipment', level: 'intermediate', met: 8.5,  color: '#eab308', desc: 'Kaki lebih tinggi dari tangan. Menargetkan dada bagian atas dan bahu lebih intensif.', steps: ['Taruh kaki di kursi atau sofa','Tangan di lantai selebar bahu','Turunkan dada ke lantai','Dorong naik hingga lengan lurus','Jaga tubuh tetap lurus'], muscles: ['Pectoralis Major (upper)','Deltoid Anterior','Triceps Brachii'], tip: 'Semakin tinggi kaki, semakin besar fokus ke dada atas dan bahu.' },
  { name: 'Incline Push-Up',  icon: exerciseIcons['Incline Push-Up'],  muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'No Equipment', level: 'beginner',     met: 6.0,  color: '#eab308', desc: 'Tangan bertumpu pada permukaan tinggi. Cocok untuk pemula atau menargetkan dada bagian bawah.', steps: ['Tangan di tepi meja atau sofa','Kaki lurus di belakang','Turunkan dada ke permukaan','Dorong naik kuat-kuat','Jaga punggung lurus'], muscles: ['Pectoralis Major (lower)','Triceps Brachii'], tip: 'Semakin rendah permukaan, semakin sulit gerakannya.' },
  { name: 'Pike Push-Up',     icon: exerciseIcons['Pike Push-Up'],     muscle: 'Bahu',     muscleIcon: muscleIcons['Bahu'],     equipment: 'No Equipment', level: 'intermediate', met: 8.0,  color: '#818cf8', desc: 'Posisi tubuh membentuk huruf V terbalik, tekuk siku ke samping. Gerakan terbaik untuk bahu tanpa alat.', steps: ['Posisi downward dog, pinggul tinggi','Tangan selebar bahu','Tekuk siku ke samping','Turunkan kepala ke arah lantai','Dorong naik kembali'], muscles: ['Deltoid','Triceps Brachii'], tip: 'Bayangkan sedang melakukan overhead press versi tubuh kamu.' },
  { name: 'Close Grip Push-Up', icon: exerciseIcons['Close Grip Push-Up'], muscle: 'Trisep', muscleIcon: muscleIcons['Trisep'], equipment: 'No Equipment', level: 'beginner', met: 8.0, color: '#fb923c', desc: 'Push-up dengan tangan berdekatan di bawah dada. Menargetkan trisep dan dada bagian tengah.', steps: ['Tangan berdekatan di bawah dada','Siku rapat ke sisi tubuh saat turun','Turunkan dada mendekati tangan','Dorong naik dengan kuat','Squeeze trisep di atas'], muscles: ['Triceps Brachii','Pectoralis Major'], tip: 'Bedakan dengan diamond: close grip siku lebih ke belakang.' },

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — PUNGGUNG
  // ════════════════════════════════════════════════════════
  { name: 'Pull Up',          icon: exerciseIcons['Pull Up'],          muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'No Equipment', level: 'intermediate', met: 5.0,  color: '#60a5fa', desc: 'Gerakan menarik tubuh ke atas menggunakan palang. Sangat efektif untuk membangun lebar punggung dan kekuatan bisep.', steps: ['Pegang palang lebih lebar dari bahu, telapak menghadap depan','Gantung dengan lengan lurus penuh','Tarik tubuh ke atas hingga dagu melewati palang','Fokus tarik siku ke bawah, bukan tangan ke atas','Turunkan perlahan dengan kontrol penuh'], muscles: ['Latissimus Dorsi','Biceps Brachii','Teres Major','Rhomboid'], tip: 'Bayangkan kamu mau memasukkan siku ke kantong celana. Ini memaksimalkan aktivasi lat.' },
  { name: 'Chin-Up',          icon: exerciseIcons['Chin-Up'],          muscle: 'Bisep',    muscleIcon: muscleIcons['Bisep'],    equipment: 'No Equipment', level: 'intermediate', met: 8.0,  color: '#f472b6', desc: 'Pull-up dengan pegangan supinasi (telapak menghadap wajah). Bisep dan punggung bekerja maksimal.', steps: ['Pegang palang dengan telapak menghadap wajah','Gantung dengan lengan lurus','Tarik tubuh hingga dagu melewati palang','Siku mengarah ke bawah saat menarik','Turunkan perlahan'], muscles: ['Biceps Brachii','Latissimus Dorsi','Trapezius'], tip: 'Chin-up lebih mudah dari pull-up karena bisep terlibat lebih besar.' },
  { name: 'Superman Hold',    icon: exerciseIcons['Superman Hold'],    muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'No Equipment', level: 'beginner',     met: 4.0,  color: '#60a5fa', desc: 'Berbaring tengkurap, angkat lengan dan kaki bersamaan. Memperkuat otot punggung bawah dan bokong.', steps: ['Berbaring tengkurap, lengan lurus ke depan','Angkat lengan, dada, dan kaki bersamaan','Tahan 2-3 detik di puncak','Turunkan perlahan','Ulangi dengan kontrol'], muscles: ['Erector Spinae','Gluteus Maximus'], tip: 'Fokus pada squeeze punggung bawah dan bokong, bukan kecepatan.' },
  { name: 'Back Extension',   icon: exerciseIcons['Back Extension'],   muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'No Equipment', level: 'beginner',     met: 4.5,  color: '#60a5fa', desc: 'Berbaring tengkurap, angkat dada dari lantai menggunakan otot punggung. Memperkuat lower back.', steps: ['Berbaring tengkurap, tangan di belakang kepala','Angkat dada dan bahu dari lantai','Gunakan otot punggung, bukan leher','Tahan 1-2 detik di atas','Turunkan perlahan'], muscles: ['Erector Spinae','Gluteus Maximus'], tip: 'Jangan paksa leher ke atas. Gerakan harus dari punggung bawah.' },
  { name: 'Bird Dog',         icon: exerciseIcons['Bird Dog'],         muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'No Equipment', level: 'beginner',     met: 3.5,  color: '#60a5fa', desc: 'Posisi merangkak, luruskan lengan dan kaki berlawanan. Bagus untuk stabilitas punggung dan core.', steps: ['Posisi merangkak, punggung lurus','Luruskan lengan kanan dan kaki kiri bersamaan','Tahan 3-5 detik','Kembali ke posisi awal','Ganti sisi dan ulangi'], muscles: ['Erector Spinae','Core','Gluteus Maximus'], tip: 'Jaga pinggul tidak miring. Fokus pada stabilitas, bukan ketinggian angkatan.' },
  { name: 'Table Row',        icon: exerciseIcons['Table Row'],        muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'No Equipment', level: 'beginner',     met: 5.0,  color: '#60a5fa', desc: 'Berbaring di bawah meja, tarik badan ke atas menyentuh tepi meja. Alternatif pull-up untuk pemula.', steps: ['Masuk di bawah meja yang stabil','Pegang tepi meja dengan tangan selebar bahu','Badan lurus dari kepala ke tumit','Tarik dada ke arah meja','Turunkan perlahan dengan kontrol'], muscles: ['Latissimus Dorsi','Biceps Brachii','Trapezius'], tip: 'Pastikan meja benar-benar stabil sebelum mulai.' },
  { name: 'Inverted Row',     icon: exerciseIcons['Inverted Row'],     muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'No Equipment', level: 'intermediate', met: 6.0,  color: '#60a5fa', desc: 'Berbaring di bawah meja stabil, tarik tubuh ke atas. Latihan pulling efektif untuk punggung dan bisep.', steps: ['Pegang tepi meja, badan lurus','Kaki lurus ke depan di lantai','Tarik dada ke arah meja dengan siku ke belakang','Squeeze punggung di puncak','Turunkan perlahan'], muscles: ['Latissimus Dorsi','Biceps Brachii','Rhomboid'], tip: 'Semakin horizontal posisi tubuh, semakin sulit gerakannya.' },

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — BAHU
  // ════════════════════════════════════════════════════════
  { name: 'Shoulder Taps',    icon: exerciseIcons['Shoulder Taps'],    muscle: 'Bahu',     muscleIcon: muscleIcons['Bahu'],     equipment: 'No Equipment', level: 'intermediate', met: 7.5,  color: '#818cf8', desc: 'Posisi plank, sentuh bahu bergantian dengan tangan lawan. Melatih stabilitas bahu dan core.', steps: ['Mulai dari posisi push-up tinggi','Angkat tangan kanan sentuh bahu kiri','Kembali ke posisi awal','Angkat tangan kiri sentuh bahu kanan','Jaga pinggul tidak berayun'], muscles: ['Deltoid','Core'], tip: 'Kunci core kuat-kuat untuk mencegah tubuh bergoyang.' },
  { name: 'Wall Push-Up',     icon: exerciseIcons['Wall Push-Up'],     muscle: 'Bahu',     muscleIcon: muscleIcons['Bahu'],     equipment: 'No Equipment', level: 'beginner',     met: 3.5,  color: '#818cf8', desc: 'Push-up berdiri menghadap dinding. Cocok untuk pemula, melatih bahu dan dada dengan intensitas rendah.', steps: ['Berdiri menghadap dinding, jarak lengan','Tangan di dinding setinggi bahu','Tekuk siku, dada ke dinding','Dorong kembali ke posisi awal','Jaga tubuh lurus'], muscles: ['Deltoid','Pectoralis Major','Triceps Brachii'], tip: 'Ideal untuk rehabilitasi atau pemula total.' },
  { name: 'Arm Circle',       icon: exerciseIcons['Arm Circle'],       muscle: 'Bahu',     muscleIcon: muscleIcons['Bahu'],     equipment: 'No Equipment', level: 'beginner',     met: 3.0,  color: '#818cf8', desc: 'Putar lengan dalam lingkaran besar ke depan dan belakang. Pemanasan bahu yang efektif.', steps: ['Berdiri tegak, lengan rentang ke samping','Putar ke depan dalam lingkaran kecil 15x','Putar ke belakang 15x','Perbesar lingkaran untuk intensitas lebih','Ganti arah dan ulangi'], muscles: ['Deltoid'], tip: 'Mulai dengan lingkaran kecil, perbesar secara bertahap.' },

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — BISEP & TRISEP
  // ════════════════════════════════════════════════════════
  { name: 'Bicep Isometric Curl', icon: exerciseIcons['Bicep Isometric Curl'], muscle: 'Bisep', muscleIcon: muscleIcons['Bisep'], equipment: 'No Equipment', level: 'beginner', met: 3.0, color: '#f472b6', desc: 'Tekan telapak tangan ke bawah meja sambil coba angkat. Latihan isometrik intensif untuk bisep.', steps: ['Duduk di depan meja','Letakkan telapak tangan di bawah tepi meja','Tekan ke atas seolah ingin mengangkat meja','Tahan 10-15 detik dengan kontraksi penuh','Rileks dan ulangi'], muscles: ['Biceps Brachii'], tip: 'Kontraksi isometrik sangat efektif untuk kekuatan bisep meski tanpa gerakan.' },
  { name: 'Towel Curl',       icon: exerciseIcons['Towel Curl'],       muscle: 'Bisep',    muscleIcon: muscleIcons['Bisep'],    equipment: 'No Equipment', level: 'beginner',     met: 3.5,  color: '#f472b6', desc: 'Injak ujung handuk, tarik ujung lain ke atas seperti curl. Resistansi dari beban tubuh sendiri.', steps: ['Lipat handuk, injak bagian tengah dengan satu kaki','Pegang kedua ujung handuk','Tekuk siku ke atas melawan resistansi kaki','Turunkan perlahan','Ganti kaki dan ulangi'], muscles: ['Biceps Brachii'], tip: 'Atur resistansi dengan meningkatkan tekanan kaki ke handuk.' },
  { name: 'Tricep Dips',      icon: exerciseIcons['Tricep Dips'],      muscle: 'Trisep',   muscleIcon: muscleIcons['Trisep'],   equipment: 'No Equipment', level: 'intermediate', met: 7.5,  color: '#fb923c', desc: 'Tangan bertumpu di kursi atau meja, turunkan badan dengan menekuk siku. Sangat efektif untuk trisep.', steps: ['Duduk di tepi kursi, tangan di pinggir','Geser ke depan hingga bokong melayang','Tekuk siku ke belakang, turunkan badan','Turunkan hingga siku 90°','Dorong kembali ke atas'], muscles: ['Triceps Brachii','Deltoid Anterior'], tip: 'Jaga siku ke belakang, bukan ke samping, untuk isolasi trisep optimal.' },
  { name: 'Bench Dips',       icon: exerciseIcons['Bench Dips'],       muscle: 'Trisep',   muscleIcon: muscleIcons['Trisep'],   equipment: 'No Equipment', level: 'intermediate', met: 6.0,  color: '#fb923c', desc: 'Kaki diluruskan ke depan, tangan di kursi atau bangku, turunkan badan.', steps: ['Kaki lurus ke depan di lantai','Tangan di tepi kursi di belakang tubuh','Turunkan badan dengan menekuk siku','Turunkan hingga siku sejajar bahu','Dorong kembali naik'], muscles: ['Triceps Brachii','Deltoid'], tip: 'Semakin jauh kaki dari kursi, semakin besar intensitasnya.' },

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — PERUT / CORE
  // ════════════════════════════════════════════════════════
  { name: 'Crunch',           icon: exerciseIcons['Crunch'],           muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'beginner',     met: 5.0,  color: '#a78bfa', desc: 'Gerakan dasar mengangkat bahu dari lantai. Efektif melatih rektus abdominis bagian atas.', steps: ['Berbaring, lutut ditekuk, kaki di lantai','Tangan di belakang kepala','Angkat bahu dari lantai dengan kontraksi perut','Jangan tarik kepala dengan tangan','Turunkan perlahan'], muscles: ['Rectus Abdominis','Obliques'], tip: 'Fokus pada kontraksi perut, bukan ketinggian angkatan.' },
  { name: 'Sit-Up',           icon: exerciseIcons['Sit-Up'],           muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'beginner',     met: 5.5,  color: '#a78bfa', desc: 'Angkat seluruh punggung dari lantai hingga duduk tegak.', steps: ['Berbaring, lutut ditekuk','Tangan silang di dada atau di kepala','Angkat punggung hingga duduk tegak','Turunkan perlahan hingga berbaring kembali','Ulangi dengan ritme konsisten'], muscles: ['Rectus Abdominis','Hip Flexors','Core'], tip: 'Sit-up melatih core lebih komprehensif dari crunch.' },
  { name: 'Plank',            icon: exerciseIcons['Plank'],            muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'beginner',     met: 3.5,  color: '#a78bfa', desc: 'Posisi tubuh lurus seperti papan. Melatih seluruh core secara isometrik.', steps: ['Posisi push-up, tumpuan di lengan bawah','Siku tepat di bawah bahu','Tubuh lurus dari kepala ke tumit','Perut dikencangkan','Tahan posisi selama durasi yang ditentukan'], muscles: ['Rectus Abdominis','Transverse Abdominis','Obliques','Erector Spinae'], tip: 'Bayangkan ada gelas berisi air di punggungmu. Jaga agar tidak tumpah.' },
  { name: 'Bicycle Crunch',   icon: exerciseIcons['Bicycle Crunch'],   muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'intermediate', met: 8.0,  color: '#a78bfa', desc: 'Gerakan mengayuh sambil memutar badan. Melatih abs dan obliques secara bersamaan.', steps: ['Berbaring, tangan di belakang kepala','Angkat bahu dan kaki dari lantai','Bawa lutut kanan ke siku kiri','Ganti ke lutut kiri dan siku kanan','Gerakan bergantian seperti mengayuh sepeda'], muscles: ['Rectus Abdominis','Obliques','Core'], tip: 'Perlambat gerakan untuk fokus pada kontraksi obliques.' },
  { name: 'Leg Raise',        icon: exerciseIcons['Leg Raise'],        muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'beginner',     met: 5.5,  color: '#a78bfa', desc: 'Berbaring, angkat kedua kaki lurus ke atas. Menargetkan lower abs dan hip flexor.', steps: ['Berbaring lurus, tangan di sisi tubuh','Angkat kedua kaki lurus hingga 90°','Turunkan perlahan tanpa menyentuh lantai','Jaga punggung bawah tetap menempel lantai','Ulangi dengan kontrol penuh'], muscles: ['Rectus Abdominis','Hip Flexors'], tip: 'Jika terlalu berat, tekuk sedikit lututnya.' },
  { name: 'Russian Twist',    icon: exerciseIcons['Russian Twist'],    muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'intermediate', met: 6.0,  color: '#a78bfa', desc: 'Duduk setengah, putar badan ke kiri dan kanan. Gerakan efektif untuk obliques dan rotasi core.', steps: ['Duduk dengan kaki sedikit terangkat','Punggung sedikit condong ke belakang','Putar badan ke kanan hingga tangan menyentuh lantai','Putar ke kiri','Jaga kaki tidak menyentuh lantai'], muscles: ['Obliques','Core','Rectus Abdominis'], tip: 'Tambahkan buku atau botol air untuk menambah resistansi.' },
  { name: 'Mountain Climber', icon: exerciseIcons['Mountain Climber'], muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'intermediate', met: 10.0, color: '#a78bfa', desc: 'Posisi plank, ganti lutut menuju dada dengan cepat. Kardio dan core dalam satu gerakan.', steps: ['Mulai dari posisi push-up tinggi','Bawa lutut kanan menuju dada','Kembali dan langsung ganti lutut kiri','Gerakan bergantian seperti lari di tempat','Jaga pinggul tidak naik'], muscles: ['Core','Rectus Abdominis','Hip Flexors','Deltoid'], tip: 'Semakin cepat = kardio lebih tinggi. Lebih lambat = fokus core.' },
  { name: 'Flutter Kick',     icon: exerciseIcons['Flutter Kick'],     muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'beginner',     met: 6.0,  color: '#a78bfa', desc: 'Berbaring, kaki terangkat sedikit dan tendang bergantian. Efektif untuk lower abs.', steps: ['Berbaring lurus, tangan di sisi tubuh','Angkat kaki 15-20cm dari lantai','Tendang bergantian naik turun dengan gerakan kecil','Jaga kaki tidak menyentuh lantai','Pertahankan punggung bawah menempel lantai'], muscles: ['Rectus Abdominis','Hip Flexors'], tip: 'Semakin rendah kaki dari lantai, semakin intens untuk lower abs.' },
  { name: 'Side Plank',       icon: exerciseIcons['Side Plank'],       muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'intermediate', met: 4.5,  color: '#a78bfa', desc: 'Plank miring bertumpu pada satu lengan. Mengisolasi otot samping perut.', steps: ['Berbaring miring, tumpuan lengan bawah','Siku di bawah bahu','Angkat pinggul hingga tubuh membentuk garis lurus','Tahan posisi','Ganti sisi'], muscles: ['Obliques','Core'], tip: 'Jaga pinggul tidak turun. Itu pertanda core bekerja.' },
  { name: 'V-Up',             icon: exerciseIcons['V-Up'],             muscle: 'Perut',    muscleIcon: muscleIcons['Perut'],    equipment: 'No Equipment', level: 'advanced',     met: 7.0,  color: '#a78bfa', desc: 'Angkat lengan dan kaki bersamaan membentuk huruf V. Gerakan full abs yang sangat intens.', steps: ['Berbaring lurus, lengan di atas kepala','Angkat lengan dan kaki bersamaan','Coba sentuh jari kaki dengan tangan','Turunkan perlahan','Jaga punggung tidak memantul di lantai'], muscles: ['Rectus Abdominis','Hip Flexors','Core'], tip: 'Gerak lambat saat turun jauh lebih efektif dari gerak cepat.' },

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — KAKI & BOKONG
  // ════════════════════════════════════════════════════════
  { name: 'Squat',            icon: exerciseIcons['Squat'],            muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 5.0,  color: '#22c55e', desc: 'Raja latihan kaki. Melatih seluruh otot tungkai bawah sekaligus dan sangat fungsional.', steps: ['Kaki selebar bahu, jari sedikit keluar','Rentangkan tangan ke depan untuk keseimbangan','Turunkan pinggul seolah duduk di kursi','Lutut mengikuti arah jari kaki, tidak ke dalam','Turunkan hingga paha sejajar lantai, lalu naik'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring','Core','Calves'], tip: 'Jaga dada tegak dan berat badan di tumit.' },
  { name: 'Jump Squat',       icon: exerciseIcons['Jump Squat'],       muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'intermediate', met: 12.0, color: '#22c55e', desc: 'Squat yang diakhiri lompatan eksplosif. Meningkatkan kekuatan, daya ledak, dan membakar kalori tinggi.', steps: ['Turunkan ke posisi squat penuh','Dorong eksplosif ke atas','Lompat setinggi mungkin','Mendarat lembut pada bola kaki','Langsung turun ke squat berikutnya'], muscles: ['Quadriceps','Gluteus Maximus','Calves'], tip: 'Mendarat dengan lembut untuk melindungi lutut.' },
  { name: 'Lunge',            icon: exerciseIcons['Lunge'],            muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 5.5,  color: '#22c55e', desc: 'Langkah panjang ke depan dengan lutut hampir menyentuh lantai. Melatih kaki secara unilateral.', steps: ['Berdiri tegak, kaki rapat','Langkahkan satu kaki ke depan panjang','Turunkan lutut belakang mendekati lantai','Lutut depan tidak melewati jari kaki','Dorong kembali dan ganti sisi'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring'], tip: 'Jaga torso tegak lurus. Condong ke depan mengurangi aktivasi glutes.' },
  { name: 'Reverse Lunge',    icon: exerciseIcons['Reverse Lunge'],    muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 5.5,  color: '#22c55e', desc: 'Langkah ke belakang dengan lutut mendekati lantai. Lebih aman untuk lutut, fokus lebih pada gluteus.', steps: ['Berdiri tegak','Langkahkan satu kaki jauh ke belakang','Turunkan lutut belakang mendekati lantai','Lutut depan tetap di atas tumit','Kembali dan ganti sisi'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring'], tip: 'Reverse lunge lebih aman dari forward lunge untuk lutut bermasalah.' },
  { name: 'Glute Bridge',     icon: exerciseIcons['Glute Bridge'],     muscle: 'Bokong',   muscleIcon: muscleIcons['Bokong'],   equipment: 'No Equipment', level: 'beginner',     met: 4.0,  color: '#f43f5e', desc: 'Berbaring, angkat pinggul ke atas dengan kekuatan gluteus. Isolasi terbaik untuk bokong tanpa alat.', steps: ['Berbaring, lutut ditekuk, kaki di lantai','Tangan di sisi tubuh','Dorong pinggul ke atas dengan kekuatan gluteus','Squeeze bokong kuat di atas','Turunkan perlahan'], muscles: ['Gluteus Maximus','Gluteus Medius','Hamstring'], tip: 'Tahan 1-2 detik di atas untuk kontraksi maksimal.' },
  { name: 'Wall Sit',         icon: exerciseIcons['Wall Sit'],         muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 4.0,  color: '#22c55e', desc: 'Duduk bersandar tembok dengan paha sejajar lantai. Latihan isometrik intensif untuk quad.', steps: ['Bersandar di tembok','Turunkan posisi duduk dengan paha sejajar lantai','Lutut membentuk sudut 90°','Tahan posisi selama mungkin','Jaga punggung tetap rata di tembok'], muscles: ['Quadriceps','Gluteus Maximus'], tip: 'Jangan turun lebih dari 90°. Ini membantu melindungi lutut.' },
  { name: 'Calf Raise',       icon: exerciseIcons['Calf Raise'],       muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 3.0,  color: '#22c55e', desc: 'Naik turun pada ujung kaki. Isolasi terbaik untuk otot betis.', steps: ['Berdiri tegak, kaki selebar bahu','Pegang dinding untuk keseimbangan','Naik ke ujung kaki setinggi mungkin','Tahan 1 detik di atas','Turunkan perlahan'], muscles: ['Gastrocnemius','Soleus'], tip: 'Lakukan di tepi tangga untuk ROM yang lebih besar.' },
  { name: 'Donkey Kick',      icon: exerciseIcons['Donkey Kick'],      muscle: 'Bokong',   muscleIcon: muscleIcons['Bokong'],   equipment: 'No Equipment', level: 'beginner',     met: 4.5,  color: '#f43f5e', desc: 'Posisi merangkak, tendang kaki ke belakang atas. Isolasi gluteus yang sangat efektif.', steps: ['Posisi merangkak, punggung lurus','Angkat satu kaki ke belakang dengan lutut ditekuk 90°','Dorong ke atas setinggi mungkin','Squeeze bokong di puncak','Turunkan dan ganti sisi'], muscles: ['Gluteus Maximus','Hamstring'], tip: 'Jaga pinggul sejajar lantai. Jangan putar pinggul untuk menambah tinggi angkatan.' },
  { name: 'Fire Hydrant',     icon: exerciseIcons['Fire Hydrant'],     muscle: 'Bokong',   muscleIcon: muscleIcons['Bokong'],   equipment: 'No Equipment', level: 'beginner',     met: 4.0,  color: '#f43f5e', desc: 'Posisi merangkak, angkat lutut ke samping. Menargetkan gluteus medius dan hip abductor.', steps: ['Posisi merangkak','Angkat satu lutut ke samping setinggi bahu','Lutut tetap ditekuk 90°','Tahan 1-2 detik di atas','Turunkan dan ganti sisi'], muscles: ['Gluteus Medius','Hip Abductor'], tip: 'Gerakan ini sangat bagus untuk kesehatan pinggul dan stabilitas gluteus.' },
  { name: 'Step-Up',          icon: exerciseIcons['Step-Up'],          muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 6.0,  color: '#22c55e', desc: 'Naiki dan turuni kursi atau anak tangga bergantian. Melatih kaki unilateral dan keseimbangan.', steps: ['Berdiri di depan kursi atau anak tangga','Langkahkan satu kaki ke atas','Ikuti dengan kaki kedua','Turunkan kaki pertama','Ikuti kaki kedua, ganti kaki terdepan'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring'], tip: 'Dorong dengan kaki yang di atas, bukan tendang dengan kaki di bawah.' },
  { name: 'Sumo Squat',       icon: exerciseIcons['Sumo Squat'],       muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'beginner',     met: 5.5,  color: '#22c55e', desc: 'Squat dengan kaki lebar dan jari mengarah keluar. Menargetkan paha dalam dan gluteus lebih luas.', steps: ['Kaki lebih lebar dari bahu','Jari kaki mengarah keluar 45°','Turunkan pinggul lurus ke bawah','Lutut mengikuti arah jari kaki','Dorong naik melalui tumit'], muscles: ['Quadriceps','Gluteus Maximus','Inner Thigh'], tip: 'Variasi squat yang lebih ramah untuk pinggul.' },
  { name: 'Lateral Lunge',    icon: exerciseIcons['Lateral Lunge'],    muscle: 'Kaki',     muscleIcon: muscleIcons['Kaki'],     equipment: 'No Equipment', level: 'intermediate', met: 5.5,  color: '#22c55e', desc: 'Langkah ke samping dengan lutut ditekuk. Melatih paha dalam dan luar serta gluteus dari sudut berbeda.', steps: ['Berdiri tegak, kaki rapat','Langkah panjang ke satu sisi','Tekuk lutut kaki yang melangkah','Kaki lainnya tetap lurus','Dorong kembali dan ganti sisi'], muscles: ['Quadriceps','Gluteus Maximus','Inner Thigh'], tip: 'Gerakan lateral sangat bagus untuk stabilitas pinggul yang sering diabaikan.' },

  // ════════════════════════════════════════════════════════
  //  NO EQUIPMENT — KARDIO
  // ════════════════════════════════════════════════════════
  { name: 'Burpee',           icon: exerciseIcons['Burpee'],           muscle: 'Kardio',   muscleIcon: muscleIcons['Kardio'],   equipment: 'No Equipment', level: 'advanced',     met: 12.0, color: '#34d399', desc: 'Kombinasi squat, push-up, dan lompatan. Raja latihan HIIT yang membakar kalori tertinggi.', steps: ['Berdiri tegak','Squat dan letakkan tangan di lantai','Lompat kaki ke belakang ke posisi plank','Lakukan satu push-up','Lompat kaki ke depan lalu loncat ke atas'], muscles: ['Kardio','Core','Pectoralis Major','Quadriceps'], tip: 'Kuasai setiap komponen secara terpisah sebelum menggabungkan.' },
  { name: 'Jumping Jack',     icon: exerciseIcons['Jumping Jack'],     muscle: 'Kardio',   muscleIcon: muscleIcons['Kardio'],   equipment: 'No Equipment', level: 'beginner',     met: 8.0,  color: '#34d399', desc: 'Loncat sambil buka tutup kaki dan tangan. Pemanasan klasik yang meningkatkan denyut jantung.', steps: ['Berdiri tegak, kaki rapat, tangan di sisi tubuh','Lompat sambil buka kaki selebar bahu','Bersamaan angkat tangan ke atas','Lompat kembali ke posisi awal','Ulangi dengan ritme konsisten'], muscles: ['Kardio','Deltoid','Gluteus Medius','Calves'], tip: 'Mendarat dengan lembut pada bola kaki untuk meminimalkan impak sendi.' },
  { name: 'High Knees',       icon: exerciseIcons['High Knees'],       muscle: 'Kardio',   muscleIcon: muscleIcons['Kardio'],   equipment: 'No Equipment', level: 'beginner',     met: 10.0, color: '#34d399', desc: 'Lari di tempat dengan lutut terangkat tinggi. Latihan kardio intensif yang juga melatih core.', steps: ['Berdiri tegak','Angkat lutut kanan hingga setinggi pinggul','Turunkan dan langsung angkat lutut kiri','Gerakan bergantian cepat seperti lari','Ayunkan tangan berlawanan dengan kaki'], muscles: ['Kardio','Core','Hip Flexors','Quadriceps'], tip: 'Jaga tempo tinggi untuk memaksimalkan manfaat kardio.' },
  { name: 'Lompat Tali (Tanpa Tali)', icon: exerciseIcons['Lompat Tali (Tanpa Tali)'], muscle: 'Kardio', muscleIcon: muscleIcons['Kardio'], equipment: 'No Equipment', level: 'beginner', met: 12.0, color: '#34d399', desc: 'Simulasi lompat tali tanpa tali. Melatih koordinasi, daya tahan, dan membakar kalori.', steps: ['Berdiri tegak, tangan di sisi tubuh','Gerakkan pergelangan tangan seperti memutar tali','Lompat kecil bergantian kaki','Jaga tempo konsisten','Pertahankan postur tegak'], muscles: ['Kardio','Calves','Core'], tip: 'Lompatan kecil lebih efisien dari lompatan besar.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — DADA
  // ════════════════════════════════════════════════════════
  { name: 'DB Chest Press',   icon: exerciseIcons['DB Chest Press'],   muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'Dumbbell',     level: 'beginner',     met: 6.0,  color: '#eab308', desc: 'Berbaring, dorong dumbbell ke atas. Gerakan bench press versi rumahan yang sangat efektif untuk dada.', steps: ['Berbaring, dumbbell di tangan setinggi dada','Siku membentuk 90°','Dorong dumbbell ke atas hingga lengan lurus','Jangan kunci siku','Turunkan perlahan ke posisi awal'], muscles: ['Pectoralis Major','Triceps Brachii','Deltoid'], tip: 'Bayangkan mendorong dada ke atas, bukan tangan ke atas.' },
  { name: 'DB Incline Press', icon: exerciseIcons['DB Incline Press'], muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'Dumbbell',     level: 'intermediate', met: 6.0,  color: '#eab308', desc: 'Press dengan punggung bersandar miring ke atas. Menargetkan dada bagian atas dan bahu.', steps: ['Sandarkan punggung di sudut 45°','Dumbbell di tangan setinggi dada','Dorong ke atas dan sedikit ke dalam','Turunkan perlahan ke posisi awal','Fokus pada stretch dada atas'], muscles: ['Pectoralis Major (upper)','Deltoid Anterior','Triceps Brachii'], tip: 'Sudut 30-45° adalah posisi terbaik untuk dada atas.' },
  { name: 'DB Flye',          icon: exerciseIcons['DB Flye'],          muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'Dumbbell',     level: 'intermediate', met: 5.0,  color: '#eab308', desc: 'Berbaring, buka tutup lengan seperti memeluk pohon. Stretch dan kontraksi dada yang optimal.', steps: ['Berbaring, dumbbell di atas dengan siku sedikit ditekuk','Buka lengan ke samping dengan arc melengkung','Turunkan hingga terasa stretch di dada','Tutup kembali ke atas dengan kekuatan dada','Squeeze dada di atas'], muscles: ['Pectoralis Major','Deltoid'], tip: 'Siku harus sedikit ditekuk sepanjang gerakan untuk melindungi sendi.' },
  { name: 'DB Pullover',      icon: exerciseIcons['DB Pullover'],      muscle: 'Dada',     muscleIcon: muscleIcons['Dada'],     equipment: 'Dumbbell',     level: 'intermediate', met: 5.5,  color: '#eab308', desc: 'Berbaring, ayunkan dumbbell dari atas kepala ke dada. Melatih dada dan lat secara unik.', steps: ['Berbaring, pegang satu dumbbell dengan kedua tangan di atas dada','Turunkan dumbbell ke belakang kepala dengan siku sedikit ditekuk','Rasakan stretch di dada dan lat','Tarik kembali ke atas dada','Jaga siku tidak terlalu lebar'], muscles: ['Pectoralis Major','Latissimus Dorsi','Triceps Brachii'], tip: 'Gerakan ini langka — melatih dada dan lat dalam satu gerakan.' },
  { name: 'DB Push-Up (Handles)', icon: exerciseIcons['DB Push-Up (Handles)'], muscle: 'Dada', muscleIcon: muscleIcons['Dada'], equipment: 'Dumbbell', level: 'intermediate', met: 8.0, color: '#eab308', desc: 'Push-up dengan tangan menggenggam dumbbell. Menambah ROM dan stabilitas lebih.', steps: ['Letakkan dumbbell di lantai selebar bahu','Pegang dumbbell dalam posisi push-up','Lakukan push-up normal','Tambahan ROM dari ketinggian dumbbell','Jaga stabilitas pergelangan tangan'], muscles: ['Pectoralis Major','Triceps Brachii','Deltoid'], tip: 'Gunakan dumbbell heksagonal agar tidak menggelinding.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — PUNGGUNG
  // ════════════════════════════════════════════════════════
  { name: 'DB Row',           icon: exerciseIcons['DB Row'],           muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell',     level: 'beginner',     met: 5.5,  color: '#60a5fa', desc: 'Bertumpu satu tangan di lutut, tarik dumbbell ke pinggang. Melatih punggung dan bisep.', steps: ['Letakkan satu lutut dan tangan di kursi','Pegang dumbbell dengan tangan lainnya','Punggung lurus dan sejajar lantai','Tarik dumbbell ke pinggang, siku ke atas','Turunkan perlahan dan ulangi'], muscles: ['Latissimus Dorsi','Biceps Brachii','Trapezius'], tip: 'Bayangkan menarik siku ke belakang, bukan mengangkat tangan.' },
  { name: 'DB Bent Over Row', icon: exerciseIcons['DB Bent Over Row'], muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell',     level: 'intermediate', met: 6.0,  color: '#60a5fa', desc: 'Bungkuk dengan punggung lurus, tarik kedua dumbbell ke perut. Compound movement terbaik untuk punggung.', steps: ['Berdiri, bungkuk 45°, punggung lurus','Pegang dumbbell di kedua tangan','Tarik kedua dumbbell ke perut dengan siku ke samping','Squeeze punggung atas di puncak','Turunkan perlahan'], muscles: ['Latissimus Dorsi','Biceps Brachii','Trapezius','Erector Spinae'], tip: 'Jaga punggung lurus. Membungkuk bisa menyebabkan cedera.' },
  { name: 'DB Deadlift',      icon: exerciseIcons['DB Deadlift'],      muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell',     level: 'intermediate', met: 7.0,  color: '#60a5fa', desc: 'Angkat dumbbell dari lantai dengan postur tegak. Gerakan compound terbaik untuk punggung dan kaki belakang.', steps: ['Dumbbell di lantai di depan kaki','Bungkuk, punggung lurus, pegang dumbbell','Dorong lantai dengan kaki sambil angkat badan','Kunci pinggul di atas','Turunkan dengan hinge pinggul ke belakang'], muscles: ['Erector Spinae','Gluteus Maximus','Hamstring','Trapezius'], tip: 'Bayangkan mendorong bumi ke bawah, bukan mengangkat dumbbell ke atas.' },
  { name: 'DB Shrug',         icon: exerciseIcons['DB Shrug'],         muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell',     level: 'beginner',     met: 4.0,  color: '#60a5fa', desc: 'Angkat bahu setinggi mungkin sambil pegang dumbbell. Isolasi langsung untuk trapezius atas.', steps: ['Berdiri tegak, dumbbell di kedua tangan','Tangan di sisi tubuh','Angkat bahu setinggi mungkin ke arah telinga','Tahan 1-2 detik di atas','Turunkan perlahan'], muscles: ['Trapezius','Upper Back'], tip: 'Jangan putar bahu — gerak lurus atas bawah saja.' },
  { name: 'DB Reverse Flye',  icon: exerciseIcons['DB Reverse Flye'],  muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell',     level: 'intermediate', met: 4.5,  color: '#60a5fa', desc: 'Bungkuk, buka lengan ke samping. Menargetkan punggung atas, rear deltoid, dan trapezius.', steps: ['Berdiri, bungkuk 45°','Dumbbell menggantung di depan','Buka lengan ke samping dengan siku sedikit ditekuk','Angkat hingga lengan sejajar lantai','Turunkan perlahan'], muscles: ['Rhomboid','Deltoid Posterior','Trapezius'], tip: 'Ini latihan terbaik untuk rear deltoid yang sering diabaikan.' },
  { name: 'DB Romanian Deadlift', icon: exerciseIcons['DB Romanian Deadlift'], muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell', level: 'intermediate', met: 6.5, color: '#60a5fa', desc: 'Hinge pinggul ke belakang, turunkan dumbbell di depan kaki. Terbaik untuk hamstring dan lower back.', steps: ['Berdiri tegak, dumbbell di depan paha','Hinge pinggul ke belakang, punggung lurus','Turunkan dumbbell di depan kaki hingga terasa stretch hamstring','Dorong pinggul ke depan untuk naik','Squeeze bokong di posisi atas'], muscles: ['Hamstring','Gluteus Maximus','Erector Spinae'], tip: 'Beda dari deadlift biasa: lutut hampir lurus dan fokus pada hamstring.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — BAHU
  // ════════════════════════════════════════════════════════
  { name: 'DB Shoulder Press', icon: exerciseIcons['DB Shoulder Press'], muscle: 'Bahu',   muscleIcon: muscleIcons['Bahu'],     equipment: 'Dumbbell',     level: 'beginner',     met: 6.0,  color: '#818cf8', desc: 'Dorong dumbbell ke atas dari posisi bahu. Compound movement terbaik untuk bahu keseluruhan.', steps: ['Duduk atau berdiri, dumbbell di ketinggian bahu','Telapak menghadap ke depan','Dorong ke atas hingga lengan hampir lurus','Jangan kunci siku','Turunkan perlahan ke posisi awal'], muscles: ['Deltoid','Triceps Brachii','Trapezius'], tip: 'Duduk lebih aman untuk punggung bawah.' },
  { name: 'DB Lateral Raise',  icon: exerciseIcons['DB Lateral Raise'],  muscle: 'Bahu',   muscleIcon: muscleIcons['Bahu'],     equipment: 'Dumbbell',     level: 'beginner',     met: 4.0,  color: '#818cf8', desc: 'Angkat dumbbell ke samping setinggi bahu. Isolasi terbaik untuk bahu medial yang membentuk V-taper.', steps: ['Berdiri, dumbbell di sisi tubuh','Angkat ke samping dengan siku sedikit ditekuk','Angkat hingga sejajar bahu','Jangan angkat lebih tinggi dari bahu','Turunkan perlahan'], muscles: ['Deltoid Medial'], tip: 'Bayangkan menuangkan air dari ceret saat mengangkat.' },
  { name: 'DB Front Raise',    icon: exerciseIcons['DB Front Raise'],    muscle: 'Bahu',   muscleIcon: muscleIcons['Bahu'],     equipment: 'Dumbbell',     level: 'beginner',     met: 4.0,  color: '#818cf8', desc: 'Angkat dumbbell ke depan setinggi bahu. Menargetkan bahu anterior dan bagian atas dada.', steps: ['Berdiri, dumbbell di depan paha','Angkat satu atau dua dumbbell ke depan','Angkat hingga sejajar bahu','Jaga siku sedikit ditekuk','Turunkan perlahan'], muscles: ['Deltoid Anterior','Pectoralis Major'], tip: 'Bahu anterior sudah banyak bekerja di push dan press, jangan over-train.' },
  { name: 'DB Arnold Press',   icon: exerciseIcons['DB Arnold Press'],   muscle: 'Bahu',   muscleIcon: muscleIcons['Bahu'],     equipment: 'Dumbbell',     level: 'intermediate', met: 5.5,  color: '#818cf8', desc: 'Press dengan rotasi lengan dari depan ke samping. Melatih ketiga kepala deltoid dalam satu gerakan.', steps: ['Duduk, dumbbell setinggi dagu, telapak menghadap wajah','Buka lengan ke samping sambil dorong ke atas','Di atas telapak menghadap ke depan','Turunkan dengan rotasi berlawanan','Satu gerakan penuh = satu rep'], muscles: ['Deltoid','Triceps Brachii'], tip: 'Gerakan rotasi ini yang membedakan Arnold Press dari shoulder press biasa.' },
  { name: 'DB Upright Row',    icon: exerciseIcons['DB Upright Row'],    muscle: 'Bahu',   muscleIcon: muscleIcons['Bahu'],     equipment: 'Dumbbell',     level: 'intermediate', met: 5.0,  color: '#818cf8', desc: 'Tarik dumbbell ke atas menuju dagu. Melatih bahu atas dan trapezius secara bersamaan.', steps: ['Berdiri, dumbbell di depan paha','Tarik ke atas menuju dagu dengan siku lebih tinggi dari tangan','Siku mengarah ke luar','Angkat hingga siku setinggi bahu','Turunkan perlahan'], muscles: ['Deltoid','Trapezius','Biceps Brachii'], tip: 'Jaga grip tidak terlalu sempit untuk menghindari impingement bahu.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — BISEP
  // ════════════════════════════════════════════════════════
  { name: 'DB Bicep Curl',         icon: exerciseIcons['DB Bicep Curl'],         muscle: 'Bisep', muscleIcon: muscleIcons['Bisep'], equipment: 'Dumbbell', level: 'beginner',     met: 4.5, color: '#f472b6', desc: 'Curl dumbbell ke atas sambil putar pergelangan tangan. Gerakan klasik isolasi bisep.', steps: ['Berdiri, dumbbell di sisi tubuh, telapak menghadap depan','Siku menempel di sisi tubuh','Angkat dumbbell ke atas dengan fleksi siku','Squeeze bisep di puncak','Turunkan perlahan'], muscles: ['Biceps Brachii','Brachialis'], tip: 'Fase turun (eksentrik) sama pentingnya untuk membangun otot.' },
  { name: 'DB Hammer Curl',         icon: exerciseIcons['DB Hammer Curl'],         muscle: 'Bisep', muscleIcon: muscleIcons['Bisep'], equipment: 'Dumbbell', level: 'beginner',     met: 4.5, color: '#f472b6', desc: 'Curl dengan telapak menghadap ke dalam. Melatih brachialis dan bisep untuk lengan lebih tebal.', steps: ['Berdiri, dumbbell di sisi tubuh, telapak menghadap ke dalam','Angkat dumbbell seperti memalu','Siku tetap di sisi tubuh','Squeeze di puncak','Turunkan perlahan'], muscles: ['Biceps Brachii','Brachialis','Brachioradialis'], tip: 'Hammer curl lebih baik untuk ketebalan lengan dari bicep curl biasa.' },
  { name: 'DB Concentration Curl',  icon: exerciseIcons['DB Concentration Curl'],  muscle: 'Bisep', muscleIcon: muscleIcons['Bisep'], equipment: 'Dumbbell', level: 'beginner',     met: 4.0, color: '#f472b6', desc: 'Duduk, siku bertumpu di paha, curl ke atas. Isolasi bisep paling fokus.', steps: ['Duduk di tepi kursi','Kaki sedikit terbuka','Siku kanan bertumpu di paha kanan','Curl dumbbell ke atas','Squeeze bisep keras di puncak'], muscles: ['Biceps Brachii'], tip: 'Ini gerakan terbaik untuk puncak bisep (bisep peak).' },
  { name: 'DB Alternating Curl',    icon: exerciseIcons['DB Alternating Curl'],    muscle: 'Bisep', muscleIcon: muscleIcons['Bisep'], equipment: 'Dumbbell', level: 'beginner',     met: 4.5, color: '#f472b6', desc: 'Curl dumbbell bergantian kiri dan kanan. Memastikan setiap lengan bekerja secara independen.', steps: ['Berdiri, dumbbell di kedua tangan','Curl tangan kanan ke atas','Turunkan dan langsung curl tangan kiri','Bergantian dengan ritme konsisten','Siku tetap di sisi tubuh'], muscles: ['Biceps Brachii','Brachialis'], tip: 'Alternatif ini lebih baik untuk keseimbangan kekuatan kedua lengan.' },
  { name: 'DB Zottman Curl',        icon: exerciseIcons['DB Zottman Curl'],        muscle: 'Bisep', muscleIcon: muscleIcons['Bisep'], equipment: 'Dumbbell', level: 'intermediate', met: 4.5, color: '#f472b6', desc: 'Curl ke atas dengan supinasi, turun dengan pronasi. Melatih bisep dan lengan bawah efisien.', steps: ['Mulai dengan telapak menghadap atas','Curl ke atas seperti biasa','Di atas, putar telapak ke bawah','Turunkan dengan telapak menghadap bawah','Di bawah, putar kembali telapak ke atas'], muscles: ['Biceps Brachii','Brachialis','Brachioradialis'], tip: 'Satu gerakan ini menggantikan dua latihan: curl dan reverse curl.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — TRISEP
  // ════════════════════════════════════════════════════════
  { name: 'DB Overhead Tricep Extension', icon: exerciseIcons['DB Overhead Tricep Extension'], muscle: 'Trisep', muscleIcon: muscleIcons['Trisep'], equipment: 'Dumbbell', level: 'beginner', met: 4.5, color: '#fb923c', desc: 'Angkat dumbbell di atas kepala, tekuk dan luruskan siku. Terbaik untuk kepala panjang trisep.', steps: ['Duduk atau berdiri','Pegang satu dumbbell dengan kedua tangan di atas kepala','Tekuk siku turunkan dumbbell ke belakang kepala','Luruskan siku kembali ke atas','Siku tetap menunjuk ke atas sepanjang gerakan'], muscles: ['Triceps Brachii (long head)'], tip: 'Overhead extension melatih long head trisep yang paling besar.' },
  { name: 'DB Skull Crusher',        icon: exerciseIcons['DB Skull Crusher'],        muscle: 'Trisep', muscleIcon: muscleIcons['Trisep'], equipment: 'Dumbbell', level: 'intermediate', met: 4.5, color: '#fb923c', desc: 'Berbaring, turunkan dumbbell ke dahi dan kembali. Isolasi langsung untuk ketiga kepala trisep.', steps: ['Berbaring, dumbbell di atas dengan siku mengarah ke langit','Tekuk siku turunkan dumbbell ke sisi kepala','Jaga siku tidak melebar','Luruskan siku kembali ke atas','Kontrol penuh — jangan sampai jatuh ke kepala'], muscles: ['Triceps Brachii'], tip: 'Ini isolasi trisep paling intens. Mulai dengan beban ringan.' },
  { name: 'DB Kickback',             icon: exerciseIcons['DB Kickback'],             muscle: 'Trisep', muscleIcon: muscleIcons['Trisep'], equipment: 'Dumbbell', level: 'beginner',     met: 4.0, color: '#fb923c', desc: 'Bungkuk, siku di pinggang, luruskan lengan ke belakang. Isolasi trisep yang efektif.', steps: ['Bungkuk 45°, siku ditekuk di pinggang','Siku setinggi bahu','Luruskan lengan ke belakang dengan kekuatan trisep','Squeeze trisep di posisi lurus','Tekuk kembali'], muscles: ['Triceps Brachii'], tip: 'Jaga siku tetap tinggi untuk ROM trisep yang optimal.' },
  { name: 'DB Close-Grip Press',     icon: exerciseIcons['DB Close-Grip Press'],     muscle: 'Trisep', muscleIcon: muscleIcons['Trisep'], equipment: 'Dumbbell', level: 'intermediate', met: 5.5, color: '#fb923c', desc: 'Press dengan pegangan sempit dan siku rapat. Menekankan aktivasi trisep lebih besar.', steps: ['Berbaring, kedua dumbbell bersentuhan di atas dada','Siku rapat ke sisi tubuh','Dorong ke atas dengan trisep','Turunkan perlahan ke dada','Jaga dumbbell tetap bersentuhan'], muscles: ['Triceps Brachii','Pectoralis Major'], tip: 'Variasi press yang sangat efektif untuk trisep.' },
  { name: 'DB Tate Press',           icon: exerciseIcons['DB Tate Press'],           muscle: 'Trisep', muscleIcon: muscleIcons['Trisep'], equipment: 'Dumbbell', level: 'advanced',     met: 4.5, color: '#fb923c', desc: 'Berbaring, siku keluar, turunkan dumbbell ke dada lalu luruskan. Variasi unik yang memaksimalkan trisep.', steps: ['Berbaring, dumbbell di atas dengan telapak menghadap kaki','Siku keluar ke samping','Tekuk siku turunkan dumbbell ke dada','Luruskan dengan memfleksikan trisep','Jaga upper arm tetap horizontal'], muscles: ['Triceps Brachii'], tip: 'Gerakan tidak umum tapi sangat efektif untuk aktivasi trisep.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — PERUT / CORE
  // ════════════════════════════════════════════════════════
  { name: 'DB Russian Twist',    icon: exerciseIcons['DB Russian Twist'],    muscle: 'Perut', muscleIcon: muscleIcons['Perut'], equipment: 'Dumbbell', level: 'intermediate', met: 6.5, color: '#a78bfa', desc: 'Duduk setengah, putar badan ke kiri dan kanan dengan dumbbell. Lebih intensif dari versi tanpa beban.', steps: ['Duduk dengan kaki terangkat','Pegang satu dumbbell dengan kedua tangan','Putar badan ke kanan hingga dumbbell hampir menyentuh lantai','Putar ke kiri','Jaga kaki tidak menyentuh lantai'], muscles: ['Obliques','Core','Rectus Abdominis'], tip: 'Kontrol gerakan — jangan hanya ayun lengan, putar dari torso.' },
  { name: 'DB Weighted Crunch',  icon: exerciseIcons['DB Weighted Crunch'],  muscle: 'Perut', muscleIcon: muscleIcons['Perut'], equipment: 'Dumbbell', level: 'beginner',     met: 5.5, color: '#a78bfa', desc: 'Crunch sambil memegang dumbbell di dada. Menambah resistansi untuk memperkuat otot perut lebih cepat.', steps: ['Berbaring, lutut ditekuk','Pegang dumbbell di dada','Angkat bahu dari lantai dengan kontraksi perut','Tahan 1 detik di atas','Turunkan perlahan'], muscles: ['Rectus Abdominis','Core'], tip: 'Mulai dengan beban ringan. Fokus pada kualitas kontraksi, bukan beban.' },
  { name: 'DB Side Bend',        icon: exerciseIcons['DB Side Bend'],        muscle: 'Perut', muscleIcon: muscleIcons['Perut'], equipment: 'Dumbbell', level: 'beginner',     met: 4.0, color: '#a78bfa', desc: 'Berdiri, condongkan badan ke samping dengan dumbbell. Isolasi obliques yang efektif.', steps: ['Berdiri, satu dumbbell di tangan kanan','Condongkan badan ke kanan sejauh mungkin','Kembali ke posisi tegak dengan kekuatan obliques kiri','Selesaikan satu sisi lalu ganti','Jaga pinggul tidak ikut bergerak'], muscles: ['Obliques','Core'], tip: 'Fokus pada kontraksi obliques sisi berlawanan saat kembali tegak.' },
  { name: 'DB Woodchop',         icon: exerciseIcons['DB Woodchop'],         muscle: 'Perut', muscleIcon: muscleIcons['Perut'], equipment: 'Dumbbell', level: 'intermediate', met: 6.0, color: '#a78bfa', desc: 'Ayun dumbbell dari atas bahu ke arah lutut berlawanan. Melatih rotasi core dan bahu secara fungsional.', steps: ['Berdiri, pegang satu dumbbell','Angkat ke atas bahu kanan','Ayun secara diagonal ke lutut kiri sambil membungkuk','Kembali ke posisi awal','Selesaikan satu sisi lalu ganti'], muscles: ['Obliques','Core','Deltoid'], tip: 'Gerakan rotasi ini sangat fungsional untuk kehidupan sehari-hari.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — KAKI & BOKONG
  // ════════════════════════════════════════════════════════
  { name: 'DB Goblet Squat',         icon: exerciseIcons['DB Goblet Squat'],         muscle: 'Kaki',   muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'beginner',     met: 6.0, color: '#22c55e', desc: 'Squat sambil pegang dumbbell di depan dada. Postur lebih tegak, quad dan gluteus lebih aktif.', steps: ['Pegang satu dumbbell vertikal di depan dada','Kaki sedikit lebih lebar dari bahu','Turunkan ke squat penuh','Siku dorong lutut keluar di bawah','Dorong naik melalui tumit'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring','Core'], tip: 'Goblet squat memaksa postur lebih tegak dari back squat biasa.' },
  { name: 'DB Lunge',                icon: exerciseIcons['DB Lunge'],                muscle: 'Kaki',   muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'beginner',     met: 6.0, color: '#22c55e', desc: 'Lunge ke depan sambil memegang dumbbell di kedua tangan. Meningkatkan intensitas dan pembakaran kalori.', steps: ['Berdiri tegak, dumbbell di kedua tangan','Langkahkan satu kaki ke depan','Turunkan lutut belakang mendekati lantai','Dorong kembali ke posisi awal','Ganti kaki dan ulangi'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring'], tip: 'Dumbbell menambah beban sekaligus melatih grip strength.' },
  { name: 'DB Bulgarian Split Squat', icon: exerciseIcons['DB Bulgarian Split Squat'], muscle: 'Kaki', muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'advanced',     met: 7.0, color: '#22c55e', desc: 'Split squat dengan kaki belakang di atas kursi sambil pegang dumbbell. Gerakan paling menantang untuk kaki.', steps: ['Berdiri di depan kursi, dumbbell di kedua tangan','Letakkan kaki belakang di atas kursi','Turunkan lutut depan mendekati lantai','Lutut depan tidak melewati jari kaki','Dorong naik melalui tumit kaki depan'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring'], tip: 'Ini latihan kaki unilateral terberat. Mulai tanpa beban dulu.' },
  { name: 'DB Sumo Squat',           icon: exerciseIcons['DB Sumo Squat'],           muscle: 'Kaki',   muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'beginner',     met: 6.0, color: '#22c55e', desc: 'Squat kaki lebar pegang satu dumbbell di tengah. Menargetkan paha dalam dan gluteus lebih luas.', steps: ['Kaki lebih lebar dari bahu, jari keluar 45°','Pegang satu dumbbell dengan kedua tangan di tengah','Turunkan dumbbell di antara kaki','Lutut mengikuti arah jari kaki','Dorong naik melalui tumit'], muscles: ['Quadriceps','Gluteus Maximus','Inner Thigh'], tip: 'Variasi squat yang sangat bagus untuk inner thigh.' },
  { name: 'DB Hip Thrust',           icon: exerciseIcons['DB Hip Thrust'],           muscle: 'Bokong', muscleIcon: muscleIcons['Bokong'], equipment: 'Dumbbell', level: 'intermediate', met: 5.5, color: '#f43f5e', desc: 'Punggung di sofa, dumbbell di pinggul, dorong pinggul ke atas. Isolasi bokong terbaik dengan beban.', steps: ['Punggung bersandar di sofa/bangku','Letakkan dumbbell di atas pinggul','Dorong pinggul ke atas hingga tubuh membentuk garis lurus','Squeeze bokong kuat-kuat di atas','Turunkan perlahan'], muscles: ['Gluteus Maximus','Gluteus Medius','Hamstring'], tip: 'Ini adalah gerakan terbaik untuk glutes. Gunakan beban yang bisa dikontrol.' },
  { name: 'DB Step-Up',              icon: exerciseIcons['DB Step-Up'],              muscle: 'Kaki',   muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'beginner',     met: 6.5, color: '#22c55e', desc: 'Naiki kursi atau anak tangga sambil pegang dumbbell. Melatih kaki fungsional dengan beban.', steps: ['Berdiri di depan kursi, dumbbell di kedua tangan','Langkahkan satu kaki ke atas kursi','Dorong naik dengan kaki yang di atas','Ikuti kaki kedua','Turunkan bergantian'], muscles: ['Quadriceps','Gluteus Maximus','Hamstring'], tip: 'Dorong dengan kaki yang di atas, bukan lompat dengan kaki di bawah.' },
  { name: 'DB Calf Raise',           icon: exerciseIcons['DB Calf Raise'],           muscle: 'Kaki',   muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'beginner',     met: 3.5, color: '#22c55e', desc: 'Berdiri sambil pegang dumbbell, naik turun ujung kaki. Isolasi betis dengan beban.', steps: ['Berdiri tegak, dumbbell di kedua tangan','Berdiri di tepi tangga untuk ROM lebih besar','Naik ke ujung kaki setinggi mungkin','Tahan 1-2 detik di atas','Turunkan perlahan di bawah level lantai'], muscles: ['Gastrocnemius','Soleus'], tip: 'Full ROM (di bawah lantai) lebih efektif dari calf raise di lantai datar.' },
  { name: 'DB Lateral Lunge',        icon: exerciseIcons['DB Lateral Lunge'],        muscle: 'Kaki',   muscleIcon: muscleIcons['Kaki'],   equipment: 'Dumbbell', level: 'intermediate', met: 6.0, color: '#22c55e', desc: 'Langkah ke samping dengan dumbbell di tangan. Melatih paha dalam dan luar serta gluteus lebih intensif.', steps: ['Berdiri, dumbbell di kedua tangan','Langkah panjang ke satu sisi','Tekuk lutut kaki yang melangkah','Dumbbell di sisi yang melangkah','Dorong kembali dan ganti sisi'], muscles: ['Quadriceps','Gluteus Maximus','Inner Thigh'], tip: 'Lateral movement sering diabaikan tapi sangat penting untuk stabilitas.' },

  // ════════════════════════════════════════════════════════
  //  WITH DUMBBELL — FULL BODY / COMPOUND
  // ════════════════════════════════════════════════════════
  { name: 'DB Thruster',        icon: exerciseIcons['DB Thruster'],        muscle: 'Kardio', muscleIcon: muscleIcons['Kardio'], equipment: 'Dumbbell', level: 'advanced',     met: 10.0, color: '#34d399', desc: 'Gabungkan goblet squat dan shoulder press dalam satu gerakan. Latihan full body paling efisien.', steps: ['Pegang dumbbell di ketinggian bahu','Turunkan ke squat penuh','Saat naik dari squat, gunakan momentum','Dorong dumbbell ke atas menjadi shoulder press','Turunkan kembali ke bahu untuk rep berikutnya'], muscles: ['Quadriceps','Gluteus Maximus','Deltoid','Triceps Brachii','Core'], tip: 'Koordinasi yang bagus lebih penting dari beban berat.' },
  { name: 'DB Renegade Row',    icon: exerciseIcons['DB Renegade Row'],    muscle: 'Punggung', muscleIcon: muscleIcons['Punggung'], equipment: 'Dumbbell', level: 'advanced',   met: 8.0,  color: '#60a5fa', desc: 'Plank di atas dumbbell, row bergantian kiri dan kanan. Melatih punggung, core, dan stabilitas.', steps: ['Push-up di atas dumbbell heksagonal','Kaki sedikit lebar untuk stabilitas','Tarik satu dumbbell ke pinggang','Kembali ke posisi plank','Ganti sisi dengan kontrol penuh'], muscles: ['Latissimus Dorsi','Core','Pectoralis Major','Biceps Brachii'], tip: 'Ini salah satu gerakan paling menantang untuk core stability.' },
  { name: 'DB Swing',           icon: exerciseIcons['DB Swing'],           muscle: 'Kardio', muscleIcon: muscleIcons['Kardio'], equipment: 'Dumbbell', level: 'intermediate', met: 9.0,  color: '#34d399', desc: 'Ayun dumbbell dari antara kaki ke setinggi bahu. Meniru gerakan kettlebell swing untuk power dan kardio.', steps: ['Pegang satu dumbbell dengan kedua tangan','Kaki sedikit lebih lebar dari bahu','Swing dumbbell ke belakang di antara kaki dengan hinge pinggul','Dorong pinggul ke depan secara eksplosif','Ayun dumbbell ke depan setinggi bahu'], muscles: ['Gluteus Maximus','Hamstring','Erector Spinae','Core','Kardio'], tip: 'Gerakan ini dari pinggul, bukan dari tangan. Pinggul yang menggerakkan beban.' },
  { name: 'DB Clean and Press', icon: exerciseIcons['DB Clean and Press'], muscle: 'Kardio', muscleIcon: muscleIcons['Kardio'], equipment: 'Dumbbell', level: 'advanced',     met: 9.5,  color: '#34d399', desc: 'Angkat dumbbell dari bawah ke bahu lalu press ke atas. Gerakan full body yang melatih power dan koordinasi.', steps: ['Dumbbell di lantai di sisi kaki','Squat, pegang dumbbell','Eksplosif berdiri sambil angkat dumbbell ke bahu (clean)','Dari bahu, press ke atas (press)','Turunkan perlahan ke lantai'], muscles: ['Quadriceps','Erector Spinae','Deltoid','Core'], tip: 'Pelajari clean dan press secara terpisah dulu sebelum digabungkan.' },
  { name: 'DB Burpee',          icon: exerciseIcons['DB Burpee'],          muscle: 'Kardio', muscleIcon: muscleIcons['Kardio'], equipment: 'Dumbbell', level: 'advanced',     met: 12.0, color: '#34d399', desc: 'Burpee dengan memegang dumbbell. Versi lebih intens dari burpee biasa.', steps: ['Pegang dumbbell di lantai','Lompat kaki ke belakang','Lakukan push-up di atas dumbbell','Lompat kaki kembali ke depan','Angkat dumbbell dan lompat ke atas'], muscles: ['Kardio','Pectoralis Major','Quadriceps','Core','Deltoid'], tip: 'Salah satu latihan paling intens yang ada. Kurangi beban, jaga form.' },
]

// ─── Muscle Guides ───────────────────────────────────────────────────────────
const muscleGuides = [
  { name: 'Dada (Chest)',     latin: 'Pectoralis Major & Minor',                icon: muscleIcons['Dada'],     image: muscleImages['Dada'],     color: '#eab308', desc: 'Otot dada adalah otot besar yang mencakup seluruh bagian depan atas tubuh. Berfungsi untuk gerakan mendorong horizontal dan adduksi lengan.', exercises: ['Push Up','Wide Push-Up','Decline Push-Up','DB Chest Press','DB Flye'], tip: 'Latih dada 2x seminggu. Variasikan sudut (incline, flat, decline) untuk melatih semua bagian dada.' },
  { name: 'Punggung (Back)',  latin: 'Latissimus Dorsi & Rhomboids',            icon: muscleIcons['Punggung'], image: muscleImages['Punggung'], color: '#60a5fa', desc: 'Punggung adalah grup otot terbesar kedua di tubuh. Terdiri dari lat (lebar), rhomboid (tengah), dan trapezius (atas).', exercises: ['Pull Up','Chin-Up','Inverted Row','DB Row','DB Bent Over Row','DB Deadlift'], tip: 'Jangan skip latihan punggung. Ketidakseimbangan dada-punggung adalah penyebab utama postur bungkuk.' },
  { name: 'Kaki (Legs)',      latin: 'Quadriceps & Hamstrings',                 icon: muscleIcons['Kaki'],     image: muscleImages['Kaki'],     color: '#22c55e', desc: 'Kaki adalah kelompok otot terbesar di tubuh. Melatih kaki meningkatkan metabolisme secara keseluruhan dan kekuatan fungsional.', exercises: ['Squat','Jump Squat','Lunge','Reverse Lunge','Wall Sit','DB Goblet Squat','DB Bulgarian Split Squat'], tip: 'Jangan pernah skip leg day. Otot kaki yang besar membantu membakar lebih banyak kalori bahkan saat istirahat.' },
  { name: 'Bokong (Glutes)',  latin: 'Gluteus Maximus, Medius & Minimus',       icon: muscleIcons['Bokong'],   image: muscleImages['Bokong'],   color: '#f43f5e', desc: 'Glutes adalah otot terbesar di tubuh manusia. Glutes yang kuat sangat penting untuk stabilitas panggul dan mencegah nyeri punggung bawah.', exercises: ['Glute Bridge','Donkey Kick','Fire Hydrant','DB Hip Thrust'], tip: 'Banyak orang mengalami "glute amnesia" karena terlalu banyak duduk. Aktifkan glutes dengan peregangan hip flexor sebelum latihan.' },
  { name: 'Bahu (Shoulders)', latin: 'Deltoideus Anterior, Medial & Posterior', icon: muscleIcons['Bahu'],     image: muscleImages['Bahu'],     color: '#818cf8', desc: 'Bahu terdiri dari tiga kepala: anterior (depan), medial (tengah), dan posterior (belakang). Bahu medial yang berkembang memberi tampilan lebar.', exercises: ['Pike Push-Up','Shoulder Taps','DB Shoulder Press','DB Lateral Raise','DB Arnold Press'], tip: 'Perbanyak latihan posterior deltoid. Kebanyakan orang over-train anterior deltoid dari push up dan bench press.' },
  { name: 'Bisep (Biceps)',   latin: 'Biceps Brachii & Brachialis',             icon: muscleIcons['Bisep'],    image: muscleImages['Bisep'],    color: '#f472b6', desc: 'Bisep bekerja melakukan fleksi siku dan supinasi lengan bawah. Bisep banyak terlatih saat latihan punggung.', exercises: ['Chin-Up','Towel Curl','DB Bicep Curl','DB Hammer Curl','DB Concentration Curl','DB Zottman Curl'], tip: 'Variasikan grip untuk melatih semua bagian bisep: supinasi untuk puncak bisep, netral (hammer) untuk brachialis.' },
  { name: 'Trisep (Triceps)', latin: 'Triceps Brachii',                         icon: muscleIcons['Trisep'],   image: muscleImages['Trisep'],   color: '#fb923c', desc: 'Trisep membentuk 2/3 massa lengan atas, jauh lebih besar dari bisep. Trisep yang kuat sangat penting untuk semua gerakan mendorong.', exercises: ['Diamond Push-Up','Tricep Dips','Bench Dips','DB Overhead Tricep Extension','DB Skull Crusher','DB Kickback'], tip: 'Untuk lengan besar, fokus pada trisep lebih dari bisep. Gerakan overhead paling mengaktifkan kepala panjang trisep.' },
  { name: 'Perut (Core)',     latin: 'Rectus Abdominis & Obliques',             icon: muscleIcons['Perut'],    image: muscleImages['Perut'],    color: '#a78bfa', desc: 'Core bukan hanya six-pack, tapi juga obliques, transverse abdominis, dan erector spinae. Core yang kuat adalah fondasi semua gerakan atletik.', exercises: ['Plank','Crunch','Bicycle Crunch','Leg Raise','Mountain Climber','V-Up','DB Russian Twist'], tip: 'Six-pack dibuat di dapur, bukan di gym. Latihan core membangun otot, tapi lemak perut hilang dengan defisit kalori.' },
  { name: 'Kardio',           latin: 'Cardiovascular System',                   icon: muscleIcons['Kardio'],   image: muscleImages['Kardio'],   color: '#34d399', desc: 'Latihan kardio melatih sistem kardiovaskular: jantung, paru-paru, dan sirkulasi darah. Meningkatkan daya tahan dan membakar kalori.', exercises: ['Jumping Jack','Burpee','High Knees','Lompat Tali (Tanpa Tali)','DB Swing','DB Thruster'], tip: 'Kombinasikan LISS dan HIIT untuk hasil optimal. HIIT lebih efisien waktu, LISS lebih baik untuk pemula.' },
]

// ─── Makronutrien ────────────────────────────────────────────────────────────
const makronutrien = [
  { name: 'Protein',     icon: makroIcons['Protein'],     color: '#ef4444', kcalPerGram: 4, pct: 30, desc: 'Membangun dan memperbaiki otot. Target: 1.6–2.2g per kg berat badan untuk yang aktif berlatih.' },
  { name: 'Karbohidrat', icon: makroIcons['Karbohidrat'], color: '#eab308', kcalPerGram: 4, pct: 50, desc: 'Sumber energi utama untuk latihan. Prioritaskan karbohidrat kompleks: nasi merah, oats, ubi.' },
  { name: 'Lemak',       icon: makroIcons['Lemak'],       color: '#22c55e', kcalPerGram: 9, pct: 20, desc: 'Penting untuk produksi hormon dan penyerapan vitamin. Fokus lemak sehat: alpukat, kacang, minyak zaitun.' },
]

// ─── Nutrisi Tips ────────────────────────────────────────────────────────────
const nutrisiTips = [
  { icon: nutrisiIcons.timing,    title: 'Timing Makan',             items: ['Makan 1-3 jam sebelum latihan untuk energi optimal','Konsumsi protein + karbohidrat 30-60 menit setelah latihan','Window makan tidak sepenting total kalori harian','Sarapan berprotein tinggi mengurangi nafsu makan sepanjang hari','Jangan latihan dengan perut kosong untuk sesi intensitas tinggi'] },
  { icon: nutrisiIcons.hidrasi,   title: 'Hidrasi',                  items: ['Minum 2-3 liter air per hari sebagai baseline','Tambahkan 500ml per jam latihan intensitas sedang','Urine berwarna kuning pucat = terhidrasi dengan baik','Minum air sebelum merasa haus — haus artinya sudah dehidrasi ringan','Elektrolit penting untuk sesi kardio lebih dari 60 menit'] },
  { icon: nutrisiIcons.pemulihan, title: 'Pemulihan',                items: ['Otot tumbuh saat tidur, bukan saat latihan','Target 7-9 jam tidur berkualitas per malam','Rest day bukan hari malas, tapi bagian dari program','Konsumsi casein protein (susu, keju cottage) sebelum tidur','Aktif recovery: jalan, stretching, yoga membantu pemulihan'] },
  { icon: nutrisiIcons.kalori,    title: 'Defisit & Surplus Kalori', items: ['Defisit 300-500 kcal/hari untuk fat loss yang sustainable','Surplus 200-300 kcal/hari untuk muscle gain tanpa banyak lemak','Hitung TDEE (Total Daily Energy Expenditure) sebagai baseline','Timbang berat badan di pagi hari, ambil rata-rata mingguan','Jangan defisit lebih dari 1000 kcal/hari — berisiko kehilangan otot'] },
  { icon: nutrisiIcons.makanan,   title: 'Makanan Prioritas',        items: ['Protein hewani: ayam, telur, ikan, daging sapi lean','Protein nabati: tempe, tahu, edamame, kacang-kacangan','Karbohidrat: nasi merah, oats, ubi, buah-buahan','Lemak sehat: alpukat, minyak zaitun, kacang kenari','Sayuran: penuhi setengah piring dengan sayuran setiap makan'] },
  { icon: nutrisiIcons.suplemen,  title: 'Suplemen Dasar',           items: ['Whey protein: praktis untuk mencapai target protein harian','Creatine monohydrate: terbukti ilmiah meningkatkan kekuatan','Vitamin D3: penting untuk yang kurang paparan sinar matahari','Omega-3 (fish oil): anti-inflamasi dan kesehatan jantung','Suplemen tidak menggantikan pola makan baik — hanya melengkapi'] },
]

// ─── MET Data ────────────────────────────────────────────────────────────────
const metData = [
  // No Equipment
  { name: 'Push Up',                  category: 'Bodyweight', met: 8.0,  intensity: 'berat'  },
  { name: 'Wide Push-Up',             category: 'Bodyweight', met: 8.0,  intensity: 'berat'  },
  { name: 'Diamond Push-Up',          category: 'Bodyweight', met: 8.5,  intensity: 'berat'  },
  { name: 'Decline Push-Up',          category: 'Bodyweight', met: 8.5,  intensity: 'berat'  },
  { name: 'Incline Push-Up',          category: 'Bodyweight', met: 6.0,  intensity: 'sedang' },
  { name: 'Pike Push-Up',             category: 'Bodyweight', met: 8.0,  intensity: 'berat'  },
  { name: 'Close Grip Push-Up',       category: 'Bodyweight', met: 8.0,  intensity: 'berat'  },
  { name: 'Pull Up',                  category: 'Bodyweight', met: 5.0,  intensity: 'sedang' },
  { name: 'Chin-Up',                  category: 'Bodyweight', met: 8.0,  intensity: 'berat'  },
  { name: 'Superman Hold',            category: 'Bodyweight', met: 4.0,  intensity: 'ringan' },
  { name: 'Back Extension',           category: 'Bodyweight', met: 4.5,  intensity: 'ringan' },
  { name: 'Bird Dog',                 category: 'Bodyweight', met: 3.5,  intensity: 'ringan' },
  { name: 'Table Row',                category: 'Bodyweight', met: 5.0,  intensity: 'sedang' },
  { name: 'Inverted Row',             category: 'Bodyweight', met: 6.0,  intensity: 'sedang' },
  { name: 'Shoulder Taps',            category: 'Bodyweight', met: 7.5,  intensity: 'berat'  },
  { name: 'Wall Push-Up',             category: 'Bodyweight', met: 3.5,  intensity: 'ringan' },
  { name: 'Arm Circle',               category: 'Bodyweight', met: 3.0,  intensity: 'ringan' },
  { name: 'Bicep Isometric Curl',     category: 'Bodyweight', met: 3.0,  intensity: 'ringan' },
  { name: 'Towel Curl',               category: 'Bodyweight', met: 3.5,  intensity: 'ringan' },
  { name: 'Tricep Dips',              category: 'Bodyweight', met: 7.5,  intensity: 'berat'  },
  { name: 'Bench Dips',               category: 'Bodyweight', met: 6.0,  intensity: 'sedang' },
  { name: 'Crunch',                   category: 'Core',       met: 5.0,  intensity: 'ringan' },
  { name: 'Sit-Up',                   category: 'Core',       met: 5.5,  intensity: 'sedang' },
  { name: 'Plank',                    category: 'Core',       met: 3.5,  intensity: 'ringan' },
  { name: 'Bicycle Crunch',           category: 'Core',       met: 8.0,  intensity: 'berat'  },
  { name: 'Leg Raise',                category: 'Core',       met: 5.5,  intensity: 'sedang' },
  { name: 'Russian Twist',            category: 'Core',       met: 6.0,  intensity: 'sedang' },
  { name: 'Mountain Climber',         category: 'Core',       met: 10.0, intensity: 'berat'  },
  { name: 'Flutter Kick',             category: 'Core',       met: 6.0,  intensity: 'sedang' },
  { name: 'Side Plank',               category: 'Core',       met: 4.5,  intensity: 'ringan' },
  { name: 'V-Up',                     category: 'Core',       met: 7.0,  intensity: 'berat'  },
  { name: 'Squat',                    category: 'Bodyweight', met: 5.0,  intensity: 'sedang' },
  { name: 'Jump Squat',               category: 'Bodyweight', met: 12.0, intensity: 'berat'  },
  { name: 'Lunge',                    category: 'Bodyweight', met: 5.5,  intensity: 'sedang' },
  { name: 'Reverse Lunge',            category: 'Bodyweight', met: 5.5,  intensity: 'sedang' },
  { name: 'Glute Bridge',             category: 'Bodyweight', met: 4.0,  intensity: 'ringan' },
  { name: 'Wall Sit',                 category: 'Bodyweight', met: 4.0,  intensity: 'ringan' },
  { name: 'Calf Raise',               category: 'Bodyweight', met: 3.0,  intensity: 'ringan' },
  { name: 'Donkey Kick',              category: 'Bodyweight', met: 4.5,  intensity: 'ringan' },
  { name: 'Fire Hydrant',             category: 'Bodyweight', met: 4.0,  intensity: 'ringan' },
  { name: 'Step-Up',                  category: 'Bodyweight', met: 6.0,  intensity: 'sedang' },
  { name: 'Sumo Squat',               category: 'Bodyweight', met: 5.5,  intensity: 'sedang' },
  { name: 'Lateral Lunge',            category: 'Bodyweight', met: 5.5,  intensity: 'sedang' },
  { name: 'Burpee',                   category: 'Kardio',     met: 12.0, intensity: 'berat'  },
  { name: 'Jumping Jack',             category: 'Kardio',     met: 8.0,  intensity: 'sedang' },
  { name: 'High Knees',               category: 'Kardio',     met: 10.0, intensity: 'berat'  },
  { name: 'Lompat Tali (Tanpa Tali)', category: 'Kardio',     met: 12.0, intensity: 'berat'  },
  // Dumbbell
  { name: 'DB Chest Press',           category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Incline Press',         category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Flye',                  category: 'Beban', met: 5.0,  intensity: 'sedang' },
  { name: 'DB Pullover',              category: 'Beban', met: 5.5,  intensity: 'sedang' },
  { name: 'DB Push-Up (Handles)',     category: 'Beban', met: 8.0,  intensity: 'berat'  },
  { name: 'DB Row',                   category: 'Beban', met: 5.5,  intensity: 'sedang' },
  { name: 'DB Bent Over Row',         category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Deadlift',              category: 'Beban', met: 7.0,  intensity: 'berat'  },
  { name: 'DB Shrug',                 category: 'Beban', met: 4.0,  intensity: 'ringan' },
  { name: 'DB Reverse Flye',          category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Romanian Deadlift',     category: 'Beban', met: 6.5,  intensity: 'berat'  },
  { name: 'DB Shoulder Press',        category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Lateral Raise',         category: 'Beban', met: 4.0,  intensity: 'ringan' },
  { name: 'DB Front Raise',           category: 'Beban', met: 4.0,  intensity: 'ringan' },
  { name: 'DB Arnold Press',          category: 'Beban', met: 5.5,  intensity: 'sedang' },
  { name: 'DB Upright Row',           category: 'Beban', met: 5.0,  intensity: 'sedang' },
  { name: 'DB Bicep Curl',            category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Hammer Curl',           category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Concentration Curl',    category: 'Beban', met: 4.0,  intensity: 'ringan' },
  { name: 'DB Alternating Curl',      category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Zottman Curl',          category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Overhead Tricep Extension', category: 'Beban', met: 4.5, intensity: 'ringan' },
  { name: 'DB Skull Crusher',         category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Kickback',              category: 'Beban', met: 4.0,  intensity: 'ringan' },
  { name: 'DB Close-Grip Press',      category: 'Beban', met: 5.5,  intensity: 'sedang' },
  { name: 'DB Tate Press',            category: 'Beban', met: 4.5,  intensity: 'ringan' },
  { name: 'DB Russian Twist',         category: 'Beban', met: 6.5,  intensity: 'sedang' },
  { name: 'DB Weighted Crunch',       category: 'Beban', met: 5.5,  intensity: 'sedang' },
  { name: 'DB Side Bend',             category: 'Beban', met: 4.0,  intensity: 'ringan' },
  { name: 'DB Woodchop',              category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Goblet Squat',          category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Lunge',                 category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Bulgarian Split Squat', category: 'Beban', met: 7.0,  intensity: 'berat'  },
  { name: 'DB Sumo Squat',            category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Hip Thrust',            category: 'Beban', met: 5.5,  intensity: 'sedang' },
  { name: 'DB Step-Up',               category: 'Beban', met: 6.5,  intensity: 'sedang' },
  { name: 'DB Calf Raise',            category: 'Beban', met: 3.5,  intensity: 'ringan' },
  { name: 'DB Lateral Lunge',         category: 'Beban', met: 6.0,  intensity: 'sedang' },
  { name: 'DB Thruster',              category: 'Beban', met: 10.0, intensity: 'berat'  },
  { name: 'DB Renegade Row',          category: 'Beban', met: 8.0,  intensity: 'berat'  },
  { name: 'DB Swing',                 category: 'Beban', met: 9.0,  intensity: 'berat'  },
  { name: 'DB Clean and Press',       category: 'Beban', met: 9.5,  intensity: 'berat'  },
  { name: 'DB Burpee',                category: 'Beban', met: 12.0, intensity: 'berat'  },
]

// ─── Categories ──────────────────────────────────────────────────────────────
const muscleCategories = ['Semua','Dada','Punggung','Kaki','Bokong','Bahu','Bisep','Trisep','Perut','Kardio']
const metCategories    = ['Semua','Bodyweight','Beban','Kardio','Core']

// ─── Exports ─────────────────────────────────────────────────────────────────
export {
  muscleIcons, muscleImages, exerciseIcons, nutrisiIcons, makroIcons,
  exercises, muscleGuides, makronutrien, nutrisiTips,
  metData, muscleCategories, metCategories,
}