
import { 
  BarChart3, 
  Home, 
  Users, 
  Book
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../uiCompoents/ui/button";
import { cn } from "../../../uiCompoents/lib/utils";
import { useLocation } from "react-router-dom";


export const DashboardSidebar = () => {
  const role = JSON.parse(localStorage.getItem('role') || '""');
  const navItems = [
    { icon: Home, label: `/${role}`, active: true },
    { icon: Users, label: "/profile", active:false },
    { icon: BarChart3, label: "/analyze", active:false },
    { icon: Book, label: "/instruction", active:false },
  ];



  const location = useLocation();
  const [collapsed] = useState(true);
  const [updatedNavItems, setUpdatedNavItems] = useState(navItems); 


  useEffect(()=>{
    const update = navItems.map((i) => {
    
      if (i.label.includes(location.pathname)) {
     
        return { ...i, active: true };
      } else {
        return { ...i, active: false }; // возможно, ты хочешь сбросить активность остальных
      }
    });
     setUpdatedNavItems(update);
  }, [location.pathname])    

  return (
<aside
  className={cn(
    "border-sidebar-border transition-all duration-300 z-50",

    // На мобильных устройствах: фиксированный сверху, иконки в горизонталь
    "fixed bg-sidebar top-0 left-0 w-full h-[60px] px-4 items-center border-b flex mb-6 md:hidden flex-row justify-between",

    // На десктопе: остаётся сбоку, иконки в колонку, высота на весь экран
    "md:static  md:flex md:flex-col md:w-[260px] md:border-b-0 md:border-r md:px-0 md:min-h-screen md:max-w-16 md:bg-inherit"
  )}
>
  <nav className="w-full flex md:flex-col flex-row py-6 md:py-0 md:space-y-2 md:mt-2">
    {updatedNavItems.map((item, index) => (
      <Button
        key={index}
        variant={item.active ? "secondary" : "ghost"}
        className={cn(
          "w-full flex items-center justify-start gap-3 mb-1 text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed && "justify-center px-2"
        )}
        asChild={!item.active}
      >
        <a href={`${item.label}`} className={collapsed ? "px-0" : ""}>
          <item.icon size={20} />
        </a>
      </Button>
    ))}
  </nav>
</aside>




  
  
  
  );
};
