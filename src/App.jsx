import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Star,
} from "lucide-react";
const reviews = Array.from(
  { length: 8 },
  (_, i) => `/reviews/review-${i + 1}.jpg`,
);
const vibe = Array.from({ length: 4 }, (_, i) => `/vibe/vibe-${i + 1}.jpg`);
const subjects = [
  {
    number: "01",
    icon: "√",
    title: "ОГЭ",
    subtitle: "9 класс",
    description:
      "Разбираем задания, закрепляем базу и учимся решать уверенно, а не на удачу.",
    tags: ["Подготовка к экзамену", "Разбор сложных тем"],
  },
  {
    number: "02",
    icon: "↗",
    title: "ЕГЭ",
    subtitle: "база / профиль",
    description:
      "Отрабатываем экзаменационные задачи, ищем пробелы и выстраиваем понятный план подготовки.",
    tags: ["Базовый уровень", "Профильный уровень"],
  },
  {
    number: "03",
    icon: "∞",
    title: "Вышмат",
    subtitle: "колледж / вуз",
    description:
      "Помогу разобраться с высшей математикой и матанализом перед сессией.",
    tags: ["Высшая математика", "Математический анализ"],
  },
];
function CalculatorSticker() {
  return (
    <svg
      className="calculator-sticker"
      viewBox="0 0 112 136"
      role="img"
      aria-label="Розовый калькулятор с сердечком"
    >
      <g transform="rotate(12 56 68)">
        <rect
          x="13"
          y="8"
          width="88"
          height="120"
          rx="15"
          fill="#1c1b20"
          transform="translate(4 5)"
        />
        <rect
          x="13"
          y="8"
          width="88"
          height="120"
          rx="15"
          fill="#ffb5ca"
          stroke="#1c1b20"
          strokeWidth="3"
        />
        <rect
          x="22"
          y="19"
          width="70"
          height="37"
          rx="7"
          fill="#f7f3ec"
          stroke="#1c1b20"
          strokeWidth="2.5"
        />
        <path
          d="M57 46 C49 40 38 33 45 27 C50 23 55 27 57 30 C62 23 73 24 73 33 C73 39 64 44 57 46Z"
          fill="#e46c9d"
          stroke="#1c1b20"
          strokeWidth="1.8"
        />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={r + "-" + c}
              x={24 + c * 23}
              y={66 + r * 18}
              width="17"
              height="13"
              rx="4"
              fill={r === 2 && c === 2 ? "#a88bea" : "#fff7ef"}
              stroke="#1c1b20"
              strokeWidth="2"
            />
          )),
        )}
      </g>
      <path
        d="M7 48 L1 43 M5 59 L0 59 M103 27 L110 22"
        fill="none"
        stroke="#a88bea"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [review, setReview] = useState(0);
  const [modal, setModal] = useState(-1);
  const [faq, setFaq] = useState(-1);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModal(-1);
      if (e.key === "ArrowRight")
        setModal((i) => (i < 0 ? i : (i + 1) % reviews.length));
      if (e.key === "ArrowLeft")
        setModal((i) =>
          i < 0 ? i : (i + reviews.length - 1) % reviews.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = modal >= 0 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  const submit = async (e) => {
    e.preventDefault();
    const text = [
      "Привет, Настя! Хочу записаться на занятие по математике 🧮",
      name && "Имя: " + name,
      grade && "Класс / курс: " + grade,
      goal && "Интересует: " + goal,
      message && "Комментарий: " + message,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
      window.prompt("Скопируй заявку и отправь Насте в Telegram:", text);
    }
    window.open("https://t.me/cyx05", "_blank", "noopener,noreferrer");
  };
  const nav = [
    ["#about", "Обо мне"],
    ["#directions", "Занятия"],
    ["#reviews", "Отзывы"],
    ["#price", "Стоимость"],
    ["#contact", "Записаться"],
  ];
  return (
    <>
      <header className="header">
        <a className="logo" href="#top">
          НАСТЯ<span className="logo-star">√</span>
          <small>тут всё сойдётся</small>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          {nav.map(([href, title]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {title}
            </a>
          ))}
        </nav>
        <a href="#contact" className="header-cta">
          погнали учиться <ArrowUpRight size={17} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-topline">
            <span></span>
            <span>ОНЛАЙН · КАЛИНИНГРАД</span>
          </div>
          <div className="hero-content">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="pulse" /> ОГЭ · ЕГЭ · ВЫСШАЯ МАТЕМАТИКА
              </div>
              <h1>
                матан —<br />
                <span className="outline">не страшно.</span>
                <br />
                <em>честно!</em>
              </h1>
              <p className="hero-lead">
                Привет, я Настя! <span>🐸</span>
                <br />
                Готовлю к ОГЭ и ЕГЭ по математике, помогаю с вышматом и объясняю
                сложное простыми словами.
              </p>
              <div className="hero-actions">
                <a className="btn btn-dark" href="#contact">
                  записаться на занятие <ArrowUpRight size={19} />
                </a>
                <a className="text-link" href="#about">
                  давай знакомиться <ArrowDown size={17} />
                </a>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-circle">
                <span className="circle-top">МОЖНО ОШИБАТЬСЯ</span>
                <span className="hero-formula">
                  МАТЕМАТИКА
                  <br />
                  БЕЗ <i>💀</i>
                </span>
                <span className="circle-bottom">НО НЕЛЬЗЯ НЕ ПОНИМАТЬ</span>
              </div>
              <span className="floating-sticker sticker-one">сложно?</span>
              <span className="floating-sticker sticker-two">
                сейчас объясню
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>с 2021 года объясняю математику</span>
            <span>листай ниже ↓</span>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            {Array.from(
              {
                length: 4,
              },
              (_, i) => (
                <span key={i}>
                  МАТЕМАТИКА МОЖЕТ БЫТЬ В КАЙФ <b>·</b> ОГЭ <b>·</b> ЕГЭ{" "}
                  <b>·</b> ВЫШМАТ <b>·</b>{" "}
                </span>
              ),
            )}
          </div>
        </div>
        <section id="about" className="section about">
          <div className="section-label">
            <span>01 / ЗНАКОМСТВО</span>
            <span>HELLO, IT'S ME</span>
          </div>
          <div className="about-grid">
            <div>
              <h2>
                привет,
                <br />я <span className="highlight">настя!</span>{" "}
                <CalculatorSticker />
              </h2>
              <p className="about-intro">
                искренне люблю математику и умею объяснять её так, чтобы
                наконец-то стало понятно.
              </p>
              <p className="muted">
                Со мной можно не бояться задавать «глупые» вопросы, ошибаться и
                переспросить хоть десять раз. Мы на одной волне — но с
                математикой всё серьёзно.
              </p>
              <a
                className="inline-link"
                href="https://t.me/mathwithcyx"
                target="_blank"
                rel="noreferrer"
              >
                загляни в мой тг-канал <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="experience">
              <div className="experience-title">
                не просто слова, а опыт <span>↘</span>
              </div>
              <div className="exp-row">
                <b>2021 — сейчас</b>
                <div>
                  <strong>Частное репетиторство</strong>
                  <p>ОГЭ, ЕГЭ (база и профиль), более 4 лет практики</p>
                </div>
              </div>
              <div className="exp-row">
                <b>с 2023</b>
                <div>
                  <strong>Kingsman School</strong>
                  <p>Очные группы по профильной математике в Калининграде</p>
                </div>
              </div>
              <div className="exp-row">
                <b>2024 — 2025</b>
                <div>
                  <strong>Ильич и школа 100б репетитора</strong>
                  <p>Куратор группы из 47 человек</p>
                </div>
              </div>
              <div className="exp-row">
                <b>ещё</b>
                <div>
                  <strong>Помощь студентам</strong>
                  <p>Подготовка к сессиям по высшей математике и матанализу</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="directions" className="section directions">
          <div className="section-label">
            <span>02 / ЧЕМ ПОМОГУ</span>
            <span>CHOOSE YOUR LEVEL</span>
          </div>
          <div className="section-heading">
            <h2>
              разберёмся
              <br />
              <i>со всем.</i>
            </h2>
            <p>
              Неважно, с какой темы начинаем. Важно, чтобы в итоге ты понимал,
              что делаешь.
            </p>
          </div>
          <div className="subject-grid">
            {subjects.map((s) => (
              <article className="subject-card" key={s.number}>
                <div className="subject-top">
                  <span> </span>
                  <span className="subject-symbol">{s.icon}</span>
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <span className="subject-subtitle">{s.subtitle}</span>
                  <p>{s.description}</p>
                </div>
                <div className="subject-footer">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="vibe-section section">
          <div className="section-label">
            <span>03 / НАШ ВАЙБ</span>
            <span>NO BORING LESSONS</span>
          </div>
          <div className="vibe-heading">
            <h2>
              серьёзно
              <br />к <span>знаниям,</span>
              <br />
              легко к процессу.
            </h2>
            <div className="vibe-meme">
              <div className="vibe-meme-quote">
                <span className="meme-italic">Главное —</span>
                <span className="meme-regular">не уработаться!</span>
              </div>
              <img
                className="shalyapin-sticker"
                src="/vibe/shalyapin.jpg"
                alt="Шаляпин — мемный стикер"
              />
            </div>
          </div>
          <div className="vibe-gallery">
            {vibe.map((src, i) => (
              <div className={"vibe-photo vibe-" + i} key={src}>
                <img
                  src={src}
                  loading="lazy"
                  alt={"Атмосфера занятий с Настей — фото " + (i + 1)}
                />
              </div>
            ))}
          </div>
          <div className="vibe-note">
            <span>♡</span> ошибки — это часть процесса. скучные уроки — нет.
          </div>
        </section>
        <section id="reviews" className="section reviews">
          <div className="section-label">
            <span>04 / ОТЗЫВЫ</span>
            <span>REAL TALK</span>
          </div>
          <div className="section-heading">
            <h2>
              не верь
              <br />
              мне на <i>слово.</i>
            </h2>
            <p>
              Лучше посмотри, что пишут ребята. И да, они тоже когда-то боялись
              математики.
            </p>
          </div>
          <div className="review-layout">
            <button
              className="review-arrow"
              aria-label="Предыдущий отзыв"
              onClick={() => setReview((review + 7) % 8)}
            >
              <ChevronLeft />
            </button>
            <button
              className="review-image"
              onClick={() => setModal(review)}
              aria-label="Увеличить отзыв"
            >
              <img
                src={reviews[review]}
                alt={"Скриншот отзыва " + (review + 1)}
              />
              <span>
                нажми, чтобы рассмотреть <ArrowUpRight size={16} />
              </span>
            </button>
            <button
              className="review-arrow"
              aria-label="Следующий отзыв"
              onClick={() => setReview((review + 1) % 8)}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="review-counter">
            <span>
              {String(review + 1).padStart(2, "0")} <small>/ 08</small>
            </span>
            <div className="review-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  aria-label={"Отзыв " + (i + 1)}
                  className={review === i ? "active" : ""}
                  onClick={() => setReview(i)}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="price" className="section pricing">
          <div className="section-label">
            <span>05 / СТОИМОСТЬ</span>
            <span>NO SURPRISES</span>
          </div>
          <div className="price-grid">
            <div>
              <h2>
                сколько
                <br />
                стоят <i>занятия?</i>
              </h2>
              <p>Обсудим твою цель и подберём подходящий формат занятий.</p>
              <span className="price-doodle">↘</span>
            </div>
            <div className="price-card">
              <div className="price-top">
                <span>ЗАНЯТИЕ ПО МАТЕМАТИКЕ</span>
                <Star size={22} fill="currentColor" />
              </div>
              <div className="price-number">
                2 000 ₽<span> / час</span>
              </div>
              <p>ОГЭ · ЕГЭ база и профиль · высшая математика / матанализ</p>
              <div className="price-rule" />
              <p className="price-note">
                Детали и удобное время согласуем лично.
              </p>
              <a href="#contact" className="btn btn-dark">
                хочу на занятие <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </section>
        <section className="faq-section section">
          <div className="section-label">
            <span>06 / ВОПРОСЫ</span>
            <span> </span>
          </div>
          <div className="faq-grid">
            <h2>
              а если
              <br />
              <i>вопросики?</i>
            </h2>
            <div className="faq-list">
              {[
                [
                  "С чем можно обратиться?",
                  "С подготовкой к ОГЭ, ЕГЭ по базовой и профильной математике, а также с высшей математикой и матанализом.",
                ],
                [
                  "Я совсем не понимаю математику. Это ок?",
                  "Да! Начнём с того, что уже получается, и постепенно разберём темы, в которых есть пробелы.",
                ],
                [
                  "Как записаться?",
                  "Заполни короткую заявку ниже. Откроется мой личный Telegram, а текст заявки можно будет вставить в чат.",
                ],
                [
                  "Занятия онлайн или очно?",
                  "В основном я занимаюсь онлайн. Если хочешь записаться в очную группу в Калининграде, напиши мне в личные сообщения.",
                ],
              ].map(([q, a], i) => (
                <div className="faq-item" key={q}>
                  <button
                    aria-expanded={faq === i}
                    onClick={() => setFaq(faq === i ? -1 : i)}
                  >
                    {q}
                    {faq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                  {faq === i && <p>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section contact">
          <div className="section-label">
            <span>07 / ЗАПИСЬ НА ЗАНЯТИЕ</span>
            <span>YOUR MOVE</span>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <h2>
                ну что,
                <br />
                <i>погнали?</i>
              </h2>
              <p>
                Расскажи немного о себе и о том, с чем нужна помощь. Дальше
                договоримся обо всём в моём Telegram.
              </p>
              <div className="social-block">
                <a href="https://t.me/cyx05" target="_blank" rel="noreferrer">
                  <span>ЛИЧНЫЙ TELEGRAM</span>
                  <strong>@cyx05</strong>
                  <ArrowUpRight />
                </a>
                <a
                  href="https://t.me/mathwithcyx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>ТГ-КАНАЛ ПРО МАТЕМАТИКУ</span>
                  <strong>@mathwithcyx</strong>
                  <ArrowUpRight />
                </a>
                <a href="https://vk.ru/cyx05" target="_blank" rel="noreferrer">
                  <span>ВКОНТАКТЕ</span>
                  <strong>vk.ru/cyx05</strong>
                  <ArrowUpRight />
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-title">
                <span>ЗАЯВКА НА ЗАНЯТИЕ</span>
                <span>♡</span>
              </div>
              <label>
                как тебя зовут?
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Твоё имя"
                  required
                  maxLength={80}
                />
              </label>
              <label>
                класс или курс
                <input
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Например, 11 класс"
                  maxLength={80}
                />
              </label>
              <label>
                что будем разбирать?
                <select
                  required
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="">Выбери направление</option>
                  <option>ОГЭ по математике</option>
                  <option>ЕГЭ — база</option>
                  <option>ЕГЭ — профиль</option>
                  <option>Высшая математика / матанализ</option>
                  <option>Другое / хочу обсудить</option>
                </select>
              </label>
              <label>
                можешь рассказать подробнее
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Что сейчас даётся сложнее всего? (необязательно)"
                  rows="3"
                  maxLength={1000}
                />
              </label>
              <button className="btn btn-dark submit" type="submit">
                перейти в Telegram <Send size={19} />
              </button>
              <p className="form-hint">
                {copied
                  ? "✓ Заявка скопирована! Вставь её в открывшийся чат со мной."
                  : "После нажатия откроется мой Telegram. Текст заявки скопируется — останется вставить и отправить."}
              </p>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <span>тут всё сойдётся · 2026</span>
        <a href="#top">наверх ↑</a>
      </footer>
      {modal >= 0 && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр отзыва"
          onClick={() => setModal(-1)}
        >
          <button
            className="lightbox-close"
            aria-label="Закрыть"
            onClick={() => setModal(-1)}
          >
            <X />
          </button>
          <button
            className="lightbox-prev"
            aria-label="Предыдущий"
            onClick={(e) => {
              e.stopPropagation();
              setModal((modal + 7) % 8);
            }}
          >
            <ChevronLeft />
          </button>
          <img
            src={reviews[modal]}
            alt={"Отзыв " + (modal + 1)}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-next"
            aria-label="Следующий"
            onClick={(e) => {
              e.stopPropagation();
              setModal((modal + 1) % 8);
            }}
          >
            <ChevronRight />
          </button>
          <span className="lightbox-count">{modal + 1} / 8</span>
        </div>
      )}
    </>
  );
}
export default App;
