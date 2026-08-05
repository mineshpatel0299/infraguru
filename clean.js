const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/ProjectExperience.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove all tracking-* classes
content = content.replace(/\btracking-[^\s"']+/g, '');
// Remove all italic classes
content = content.replace(/\bitalic\b/g, '');

// Clean up double spaces caused by removing classes
content = content.replace(/  +/g, ' ');

// Revert AI text
content = content.replace(/A Symphony of <br className="hidden sm:block" \/> <span className="text-white\/60 ">Luxury & Design<\/span>/g, 'Built To Outlast <br className="hidden sm:block" /> <span className="text-white/60">The Blueprint</span>');
content = content.replace(/Uncompromising <br className="hidden sm:block" \/> <span className=" text-\[#132731\]\/60">Elegance<\/span>/g, 'Appointed Without Compromise');
content = content.replace(/Curated Spaces/g, 'Every Angle, Considered');
content = content.replace(/Private Consultation/g, 'Seal The Deal');
content = content.replace(/Schedule A <br className="hidden sm:block" \/> <span className=" text-white\/60">Viewing<\/span>/g, 'Request A Private Viewing');
content = content.replace(/Discover More Properties/g, 'Continue The Portfolio');
content = content.replace(/Register Interest/g, 'Direct Inquiry');

// Fix paragraph in Enquire
const enquireParaRegex = /<p className="mb-10 font-body text-lg leading-relaxed text-white\/70 font-light max-w-md">\s*Experience the pinnacle of luxury living\. Connect with our advisors for floor plans, pricing configurations, and exclusive previews\.\s*<\/p>\s*\{project\.testimonial && \(\s*<div className="border-l border-white\/20 pl-6 mt-8">\s*<p className="text-xl leading-relaxed text-white\/90 mb-4">\s*&ldquo;\{project\.testimonial\.quote\}&rdquo;\s*<\/p>\s*<span className="text-\[0\.65rem\] font-bold text-white\/50 uppercase">\s*\{project\.testimonial\.author\} &mdash; \{project\.testimonial\.role\}\s*<\/span>\s*<\/div>\s*\)\}/g;

const enquireReplaced = `{project.testimonial && (
                  <div className="border-l border-white/20 pl-6 mt-8">
                    <p className="text-xl leading-relaxed text-white/90 mb-4">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <span className="text-[0.65rem] font-bold text-white/50 uppercase">
                      {project.testimonial.author} &mdash; {project.testimonial.role}
                    </span>
                  </div>
                )}`;

content = content.replace(enquireParaRegex, enquireReplaced);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleanup completed');
