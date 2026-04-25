import "./About.css";

export function About() {
    return (
        <div className="About">

            <h2>About Us</h2>
            <p className="About-subtitle">Crafting journeys to worlds that don't exist — yet.</p>

            {/* Section 1 — The Concept */}
            <section className="About-section">
                <h3 className="About-section-title">The Concept</h3>
                <p>
                    <strong>Imaginary Vacation</strong> is a luxury travel agency dedicated to the extraordinary.
                    We specialize in escapes to destinations born entirely from imagination —
                    crystalline cities floating above violet seas, ancient forests where time moves like honey,
                    and resort islands that appear only at dusk on the edge of the known world.
                </p>
                <p>
                    Every vacation in our collection is hand-curated by our team of visionary explorers,
                    designed not just to impress the senses, but to <strong>transcend them</strong>.
                    Our guests do not simply visit a place — they step into a story.
                </p>
                <p>
                    Whether you seek stillness, wonder, or the particular thrill of the impossible,
                    Imaginary Vacation is your passport to the undiscovered.
                </p>
            </section>

            {/* Section 2 — About the System */}
            <section className="About-section">
                <h3 className="About-section-title">About the System</h3>
                <p>
                    This platform is a full-stack web application that allows users to browse, like,
                    and explore fictional vacation destinations, while admins can manage the full catalog.
                </p>
                <p>
                    The system is built with the following technologies:
                </p>
                <ul className="About-tech-list">
                    <li><strong>Frontend:</strong> React, TypeScript, Redux Toolkit, Vite</li>
                    <li><strong>Backend:</strong> Node.js, Express, TypeScript, REST API</li>
                    <li><strong>Database:</strong> MySQL 8 — relational schema for vacations, users, and likes</li>
                    <li><strong>AI Integration:</strong> OpenAI GPT — personalized vacation recommendations</li>
                    <li><strong>MCP:</strong> Model Context Protocol — natural-language queries directly against the database</li>
                    <li><strong>DevOps:</strong> Docker & Docker Compose — full containerized deployment</li>
                </ul>
            </section>

            {/* Section 3 — About the Developer */}
            <section className="About-section About-developer">
                <img
                    src="http://localhost:4000/api/images/roy.jpg"
                    alt="Roy Ben-Tzur"
                    className="About-photo"
                />
                <div className="About-developer-text">
                    <h3 className="About-section-title">About the Developer</h3>
                    <p>
                        My name is <strong>Roy Ben-Tzur</strong>, a Full-Stack development & AI Generative student at
                        <strong> John Bryce</strong>.
                    </p>
                    <p>
                        This project was built as part of my full-stack generative AI course,
                        combining modern web development with real-world AI integrations.
                        I'm passionate about clean code, thoughtful UI design, and building
                        systems that are both powerful and elegant.
                    </p>
                </div>
            </section>

            {/* Tagline */}
            <span className="About-tagline">Welcome to a world beyond the map.</span>

            {/* Disclaimer */}
            <div className="About-disclaimer">
                <strong>Disclaimer:</strong> I do not own the rights to any of the movies, characters,
                or fictional universes referenced in this project. All vacation destinations, images,
                and ideas are fan-made and used strictly for educational and study purposes only.
                No commercial use is intended.
            </div>

        </div>
    );
}
