import Reveal from "@/components/Reveal";
import { profile } from "@/data/resume";
import { DownloadIcon, ExtIcon, GithubIcon, LinkedinIcon, XIcon } from "@/components/Icons";

const Contact = () => (
  <section className="sec compact" id="contact">
    <div className="page">
      <div className="ct">
        <Reveal>
          <span className="kick">06 — Contact</span>
          <h2 className="h2">
            Let's build <em>something</em>.
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Open to AI/ML engineering roles, internships and collaborations. One email is enough.
          </p>
          <a className="mail" href={`mailto:${profile.email}`} data-magnetic data-magnetic-padding="8">
            {profile.email}
          </a>
          <div className="ct-acts">
            <a className="btn" href={profile.resume} download data-magnetic data-magnetic-padding="4">
              Download resume <DownloadIcon />
            </a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="ct-rows">
            <div className="ct-row">
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="ct-row">
              <span>Location</span>
              <span>{profile.location}</span>
            </div>
            <div className="ct-row">
              <span>GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> deepspsd <ExtIcon />
              </a>
            </div>
            <div className="ct-row">
              <span>LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                deepak-prasad-s <ExtIcon />
              </a>
            </div>
            <div className="ct-row">
              <span>X</span>
              <a href={profile.x} target="_blank" rel="noopener noreferrer">
                <XIcon /> DeepakAppuSV <ExtIcon />
              </a>
            </div>
            <div className="ct-row">
              <span>Languages</span>
              <span>{profile.languages.join(", ")}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Contact;
