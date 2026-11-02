import { profile } from "@/data/resume";

const Footer = () => (
  <footer className="foot">
    <div className="page in">
      <span className="status">Available for AI/ML roles</span>
      <span>
        © {new Date().getFullYear()} <b>{profile.name}</b> · {profile.location}
      </span>
    </div>
  </footer>
);

export default Footer;
