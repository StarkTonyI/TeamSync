import { Dialog, DialogContent } from "../../uiCompoents/ui/dialog";
import { Badge } from "../../uiCompoents/ui/badge";
import { Button } from "../../uiCompoents/ui/button";
import { Avatar, AvatarFallback } from "../../uiCompoents/ui/avatar";
import { useToast } from "../../uiCompoents/ui/use-toast";
import { motion } from "framer-motion";
import { User, MapPin, Mail, Calendar, Briefcase, Award, Github } from "lucide-react";
import '../profileCard/profileCard.css'
import { useInviteUserMutation } from "../../redux/adminApi/adminApi";
import { useState } from "react";
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    login: string;
    lastname: string;
    role:string;
    username: string;
    _id: string;
  };
  animate:string;
}


export function UserModalInvite({ isOpen, onClose, user }: UserModalProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [inviteUser] = useInviteUserMutation();
  
  const handleInvite = async() => {
    toast({
      title: "Invitation Sent",
      description: `Team invitation sent to ${user.username}`,
    });
    await inviteUser(user._id).unwrap(); 
    onClose();
  };
//   <p className="text-sm text-white/60 mb-1"></p>
  const additionalInfo = {
    location: "San Francisco, CA",
    login: "sarah.anderson@example.com",
    joined: "January 2022",
    experience: "8+ years",
    achievements: ["Design Excellence Award 2023", "UX Innovation Prize"],
    github: "github.com/sarahanderson",
    skills: ["UI/UX Design", "Design Systems", "User Research", "Prototyping", "Figma", "Adobe Suite"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] border border-white/10 p-0 overflow-hidden 
      max-w-md w-full max-h-[85vh] overflow-y-auto z-[2000] -ml-[300px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 "
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 rounded-full border-2 border-white/10 bg-[#2A2F3C]">
              <User className="h-12 w-12 text-white/70" />
              <AvatarFallback className="bg-[#2A2F3C] text-white">
                {user.username}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-white truncate">
                  {user.username}
                </h2>
                <Badge
                  variant="outline"
                  className="bg-[#2A2F3C] text-white/90 border-white/10 px-2 py-0.5 text-xs"
                >
                  Exert
                </Badge>
              </div>
              <p className="text-sm text-white/60 mb-1">{user.role}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/80">
            "Award-winning designer with 8+ years of experience in product design and brand strategy. Passionate about creating intuitive user experiences that bridge the gap between functionality and aesthetics. Specialized in design systems and user-centered design methodologies.",
          </p>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{additionalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{additionalInfo.login}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Joined {additionalInfo.joined}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{additionalInfo.experience} experience</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Github className="h-4 w-4" />
                <span className="text-sm">{additionalInfo.github}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {additionalInfo.achievements.map((achievement, index) => (
                    <Badge
                      key={index}
                      className="bg-[#2A2F3C] text-white/80 border-white/10"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {additionalInfo.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-[#2A2F3C] text-white/80 border-white/10"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white/90 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {additionalInfo.languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-[#2A2F3C] text-white/80 border-white/10"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className={`w-full h-11 bg-white text-[#1A1F2C] hover:bg-white/90 transition-all duration-300 ${
                isHovered ? "scale-[0.98]" : "scale-100"
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleInvite}
            >
              Invite to Team
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}