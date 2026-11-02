import Reveal from "@/components/Reveal";
import { experience, profile } from "@/data/resume";
import { ArrowIcon } from "@/components/Icons";

const Experience = () => (
  <section className="sec" id="experience">
    <div className="page">
      <Reveal className="sec-head">
        <div>
          <span className="kick">02 — Experience</span>
          <h2 className="h2">
            Work that <em>ships</em>.
          </h2>
        </div>
        <p className="lede">
          Client-facing AI delivery at Expora, three open-source systems in production, and a national top-50 hackathon finish.
        </p>
      </Reveal>

      <div className="xp">
        {experience.map((x, i) => (
          <Reveal as="article" className={`xp-row${x.current ? " current" : ""}`} key={x.role} delay={i * 0.06}>
            <div>
              <div className="xp-when">{x.when}</div>
              {x.current && <span className="now">Now</span>}
            </div>
            <div>
              <h3 className="h3 xp-role">{x.role}</h3>
              <p className="xp-co">
                <span>{x.org}</span>
                <span className="dot" aria-hidden="true" />
                <span>{x.where}</span>
              </p>
              <ul className="bul">
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tags">
                {x.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal as="article" className="xp-row">
          <div>
            <div className="xp-when">2027 →</div>
          </div>
          <div>
            <h3 className="h3 xp-role">Open to AI/ML engineering roles</h3>
            <p className="xp-co">
              <span>Natural language processing, deep learning and intelligent system design.</span>
            </p>
            <a className="btn" href={`mailto:${profile.email}?subject=AI%2FML%20role`} data-magnetic data-magnetic-padding="4">
              Start a conversation <ArrowIcon />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Experience;
