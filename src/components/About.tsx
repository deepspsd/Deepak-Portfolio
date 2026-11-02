import Reveal from "@/components/Reveal";
import { about, profile } from "@/data/resume";
import portrait from "@/assets/park.webp";

const tones = ["tone-b", "tone-c", "tone-a"];

const About = () => (
  <section className="sec compact" id="about">
    <div className="page">
      <Reveal className="sec-head">
        <div>
          <span className="kick">01 — About</span>
          <h2 className="h2">
            Shipped, <em>not</em> demoed.
          </h2>
        </div>
        <p className="lede">
          Retrieval, speech and multi-agent systems that run in production, built end-to-end from data to API to interface.
        </p>
      </Reveal>

      <div className="about-grid">
        <Reveal>
          <p className="statement">{about.statement}</p>
          <p className="statement">{about.detail}</p>
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="about-tiles">
          <div className="photo">
            <img src={portrait} alt={`${profile.name}, outdoors in Bengaluru`} loading="lazy" width={960} height={1280} />
            <span className="lab">{profile.name}</span>
          </div>
          {about.stats.map((s, i) => (
            <div className={`card grainy stat ${tones[i]}${i === about.stats.length - 1 ? " wide" : ""}`} key={s.l}>
              <span className="n">{s.n}</span>
              <span className="l">{s.l}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
