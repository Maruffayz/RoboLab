export type Lesson = {
  id: string;
  title: string;
  objective: string;
  explanation: string;
  visualDemo: string[];
  codeExample: string;
  challenge: string;
  simulatorSnippet: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

export const learningCourses: Course[] = [
  {
    id: 'robotics-fundamentals',
    title: 'Robotics Fundamentals',
    description: 'Robotlarning asosiy tamoyillari, harakat va sensorlar bilan tanishish.',
    modules: [
      {
        id: 'robot-basics',
        title: 'Robot asoslari',
        description: 'Robot nimadan tashkil topadi va u qanday ishlaydi?',
        lessons: [
          {
            id: 'robot-structure',
            title: 'Robotning tuzilishi',
            objective: 'Robotning asosiy komponentlarini aniqlash.',
            explanation:
              'Robot — bu sensorlar, motorlar, boshqaruv elektronika va dastur orqali maqsadga keluvchi mashina tizimidir. Har bir robotda kiritish, ishlov berish va chiqarish jarayoni mavjud bo’ladi. Sensorlar atrof-muhitni o’lchaydi, boshqaruvchi esa ma’lumotlarga qarab qaror qabul qiladi, motorlar esa harakatni amalga oshiradi.',
            visualDemo: [
              'Sensorlar ma’lumot to’playdi',
              'Dastur qaror qabul qiladi',
              'Motorlar harakatni boshqaradi',
            ],
            codeExample: `robot.forward(40)
robot.get_distance()
robot.stop()`,
            challenge: 'Sizga robotga 3 ta muhim komponentni nomlash vazifasi berildi: sensor, motor va boshqaruvchi.',
            simulatorSnippet: `robot.forward(35)
robot.get_distance()
robot.stop()`,
          },
          {
            id: 'movement-principles',
            title: 'Harakat tamoyillari',
            objective: 'Robot qanday oldinga, orqaga va burilishini tushunish.',
            explanation:
              'Robotning harakati uning chap va o’ng motorlarining tezligi bilan belgilanadi. Agar ikkala motor bir xil tezlikda ishlasa, robot to’g’ri chiziqda harakatlanadi. Agar motorlar tezligi farq qilsa, robot buriladi.',
            visualDemo: [
              'Ikkala motor = to’g’ri yurish',
              'Chap motor past, o’ng motor yuqori = chapga burilish',
              'Ikkala motor nol = to’xtash',
            ],
            codeExample: `robot.forward(60)
robot.turn_left(25)
robot.stop()`,
            challenge: 'Robotni 2 metr davomida to’g’ri yo’l bo’yicha yurib, keyin chapga burishga va to’xtashga dasturlang.',
            simulatorSnippet: `robot.forward(60)
robot.turn_left(20)
robot.stop()`,
          },
        ],
      },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Robots uchun mantiq, shartlar va sikllarni tushunish.',
    modules: [
      {
        id: 'logic',
        title: 'Mantiq va shartlar',
        description: 'Qarorlarni qabul qilishning asosiy usullari.',
        lessons: [
          {
            id: 'if-logic',
            title: 'Agar sharti',
            objective: 'Agar sharti yordamida robotni to’g’ri harakatlantirish.',
            explanation:
              'Robot ishlashida ko’pincha “agar” sharti muhim rol o’ynaydi. Masalan, agar sensor oldinda to’siqni ko’rsatsa, robot buriladi. Bu shartlar robotning moslashuvchan va xavfsiz harakatini ta’minlaydi.',
            visualDemo: [
              'To’siq yo’q = oldinga yurish',
              'To’siq bor = burilish',
              'Qayta tekshirish = yangi qaror',
            ],
            codeExample: `distance = robot.get_distance()
if distance < 20:
    robot.stop()
else:
    robot.forward(50)`,
            challenge: 'Agar masofa 18 sm dan kichik bo’lsa, robot to’xtasin; aks holda davom etsin.',
            simulatorSnippet: `distance = robot.get_distance()
if distance < 18:
    robot.stop()
else:
    robot.forward(50)`,
          },
        ],
      },
    ],
  },
  {
    id: 'motors',
    title: 'Motors',
    description: 'Dvigatellar, quvvat va aylanishga tegishli bosqichlar.',
    modules: [
      {
        id: 'motion-control',
        title: 'Harakatni boshqarish',
        description: 'Dvigatel va uzatmalar orqali robot harakatini modellashtirish.',
        lessons: [
          {
            id: 'motor-drive',
            title: 'Dvigatelni boshqarish',
            objective: 'Chap va o’ng dvigatelning tezligini sozlash.',
            explanation:
              'Dvigatel tezligi robotning xarakterini belgilaydi. Har bir motor alohida boshqarilishi mumkin, bu esa robotga chapga, o’ngga yoki aylanishga imkon beradi. O’zi taqqoslanadigan qiymatlar kuchli va nozik harakatga olib keladi.',
            visualDemo: [
              'Chap = 50%, O’ng = 50% => oldinga',
              'Chap = -30%, O’ng = 30% => chapga burilish',
              '0% va 0% => to’xtash',
            ],
            codeExample: `robot.forward(50)
robot.turn_right(35)
robot.stop()`,
            challenge: 'Robotni 50% tezlik bilan oldinga yurib, so’ng o’ngga burilib, qayta to’xtatishga dasturlang.',
            simulatorSnippet: `robot.forward(50)
robot.turn_right(35)
robot.stop()`,
          },
        ],
      },
    ],
  },
  {
    id: 'sensors',
    title: 'Sensors',
    description: 'Sensorlar orqali muhitni o’rganish va ma’lumot yig’ish.',
    modules: [
      {
        id: 'perception',
        title: 'Qabul qilish',
        description: 'Sensorlar robotga dunyo haqida ma’lumot beradi.',
        lessons: [
          {
            id: 'ultrasonic-sensor',
            title: 'Ultrasonik sensor',
            objective: 'Masofani o’lchash va to’siqni aniqlash.',
            explanation:
              'Ultrasonik sensor tovush to’lqinlarini jo’natib, ularning qaytish vaqti orqali masofani o’lchaydi. Bu usul to’siqni ko’rishda juda foydali bo’ladi, ayniqsa robot yo’lda yoki devorda to’xtashi kerak bo’lganda.',
            visualDemo: [
              'Sensor oldinda masofani o’lchaydi',
              'Masofa kichik bo’lsa to’siq aniqlandi',
              'Robot qaror qabul qiladi',
            ],
            codeExample: `distance = robot.get_distance()
if distance < 25:
    robot.stop()
else:
    robot.forward(45)`,
            challenge: 'Ultrasonik sensor yordamida 25 sm gacha bo’lgan to’siqlarni aniqlab, robotni to’xtating.',
            simulatorSnippet: `distance = robot.get_distance()
if distance < 25:
    robot.stop()
else:
    robot.forward(45)`,
          },
        ],
      },
    ],
  },
  {
    id: 'mobile-robotics',
    title: 'Mobile Robotics',
    description: 'Harakatlanuvchi robotlarning navigatsiyasi va traektoriyalari.',
    modules: [
      {
        id: 'navigation',
        title: 'Navigatsiya',
        description: 'Harakatlanish strategiyasi va belgilangan yo’l.',
        lessons: [
          {
            id: 'path-following',
            title: 'Yo’lni kuzatish',
            objective: 'Robotni ma’lum yo’l bo’ylab harakatlantirish.',
            explanation:
              'Mobil robot uchun yo’lni kuzatish — bu muayyan traektoriya bo’yicha harakatlanishdir. Bunda sensor ma’lumotlari va motor tezligi birgalikda ishlaydi. Robotning harakati muvofiqlashtirilgan bo’lishi kerak.',
            visualDemo: [
              'Boshlang’ich nuqta',
              'Markazga qarab harakat',
              'To’xtash va qaror',
            ],
            codeExample: `robot.forward(55)
robot.turn_left(18)
robot.forward(55)
robot.stop()`,
            challenge: 'Robotni bir metr oldinga, so’ng chapga burilib yana bir metrga yurib, keyin to’xtatish.',
            simulatorSnippet: `robot.forward(55)
robot.turn_left(18)
robot.forward(55)
robot.stop()`,
          },
        ],
      },
    ],
  },
  {
    id: 'robot-arms',
    title: 'Robot Arms',
    description: 'Manipulatorlar va qo’l robotlari uchun boshqaruv asoslari.',
    modules: [
      {
        id: 'manipulation',
        title: 'Manipulyatsiya',
        description: 'Qo’l robotlarining burchaklari va koordinatalari.',
        lessons: [
          {
            id: 'joint-control',
            title: 'Bo’g’inlarni boshqarish',
            objective: 'Qo’l robotlarining harakatini tushunish.',
            explanation:
              'Robot qo’li bir necha bo’g’inlardan iborat bo’ladi. Har bir bo’g’in ma’lum burchakga buriladi va bu birikma umumiy holatni hosil qiladi. Bu holatni nazorat qilish manipulyatsiya samaradorligini oshiradi.',
            visualDemo: [
              'Bo’g’inlar burchaklarini o’zgartirish',
              'Qo’l yuqoriga ko’tariladi',
              'Ob’ektni ushlab olish',
            ],
            codeExample: `robot.forward(20)
robot.turn_left(10)
robot.stop()`,
            challenge: 'Qo’l robotini kichik burchak bilan ko’tarib, keyin to’xtatish vazifasi.',
            simulatorSnippet: `robot.forward(20)
robot.turn_left(10)
robot.stop()`,
          },
        ],
      },
    ],
  },
  {
    id: 'autonomous-robotics',
    title: 'Autonomous Robotics',
    description: 'O’zi qaror qabul qiluvchi va mustaqil ishlaydigan tizimlar.',
    modules: [
      {
        id: 'autonomy',
        title: 'Avtonomiya',
        description: 'Mustaqil robot xatti-harakati va qaror qabul qilish.',
        lessons: [
          {
            id: 'decision-loop',
            title: 'Qaror qabul qilish sikli',
            objective: 'Sensor ma’lumotlari asosida mustaqil harakat rejasini yaratish.',
            explanation:
              'Avtonom robot doimiy ravishda sensorlar orqali ma’lumot to’playdi, keyin qaror qabul qiladi. Bu jarayon — o’lchash, tahlil qilish, yechim tanlash va harakat — avtomatik ishlaydi. Shu sababli robot mustaqil muhitni boshqarishga qodir bo’ladi.',
            visualDemo: [
              'Ma’lumot yig’ish',
              'Qaror qabul qilish',
              'Harakatni bajarish',
            ],
            codeExample: `distance = robot.get_distance()
if distance < 15:
    robot.turn_left(25)
else:
    robot.forward(60)`,
            challenge: 'Agar masofa 15 sm dan kichik bo’lsa, robot chapga burilsin; aks holda oldinga yursin.',
            simulatorSnippet: `distance = robot.get_distance()
if distance < 15:
    robot.turn_left(25)
else:
    robot.forward(60)`,
          },
        ],
      },
    ],
  },
];
