import Reveal from "@/components/Reveal";
import { certifications, education } from "@/data/resume";
import { ExtIcon } from "@/components/Icons";

const Education = () => (
  <section className="sec compact" id="education">
    <div className="page">
      <Reveal className="sec-head">
        <div>
          <span className="kick">05 — Education</span>
          <h2 className="h2">
            Degree, <em>plus</em> proof.
          </h2>
        </div>
        <p className="lede">Formal computer science with an AI specialisation, backed by certifications and a national hackathon result.</p>
      </Reveal>

      <div className="ed-grid">
        <div>
          {education.map((e, i) => (
            <Reveal as="article" className="card ed" key={e.school} delay={i * 0.06}>
              <h3 className="h3">{e.school}</h3>
              <p className="meta">
                <span>{e.degree}</span>
              </p>
              <p className="meta">
                <span>{e.when}</span>
                <span>·</span>
                <span>{e.where}</span>
              </p>
              <div className="score">
                <b>{e.score}</b>
                <small>{e.scoreLabel}</small>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <span className="kick" style={{ marginBottom: 16 }}>
            Certifications
          </span>
          <ul className="cert">
            {certifications.map((c) => (
              <li key={c.title}>
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  <span>
                    {c.title}
                    <small>{c.sub}</small>
                  </span>
                  <ExtIcon />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Education;
