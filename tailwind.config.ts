import tailwind from 'tailwindcss-animate'

/*
	extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  modal: {
			background: "#1A1F2C",
			lighter: "#252B3D",
			border: "#2A324A"
		  },
		  sidebar: {
			DEFAULT: "hsl(var(--sidebar-background))",
			foreground: "hsl(var(--sidebar-foreground))",
			primary: "hsl(var(--sidebar-primary))",
			"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
			accent: "hsl(var(--sidebar-accent))",
			"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
			border: "hsl(var(--sidebar-border))",
			ring: "hsl(var(--sidebar-ring))",
		  },
		  taskapp: {
			dark: '#1A1F2C',
			darker: '#14171F',
			purple: '#8B5CF6',
			'purple-hover': '#7C3AED',
			'gray-light': '#C8C8C9',
			'gray-medium': '#9F9EA1',
			'gray-dark': '#403E43',
		},
		  chat: {
			dark: "#1A1F2C",
			darker: "#151822",
			lighter: "#2A2F3C",
			accent: "#8B5CF6",
			"accent-hover": "#7C4DEF",
			"message-bg": "#2D3348",
			"message-hover": "#343B52",
		  },
		  notification: {
			DEFAULT: '#1A1F2C',
			lighter: '#2A2F3C',
			accent: '#9b87f5',
			'accent-hover': '#8a76e4',
			danger: '#E57373',
			'danger-hover': '#D32F2F',
			success: '#81C784',
			'success-hover': '#4CAF50',
			text: '#FFFFFF',
			subtext: '#D6BCFA'
		},
		  telegram: {
			bg: "#1A1F2C",
			accent: "#8B5CF6",
			danger: "#F97316",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		  "fade-in": {
			"0%": { opacity: "0", transform: "translateY(10px)" },
			"100%": { opacity: "1", transform: "translateY(0)" },
		  },
		  "fade-out": {
			"0%": { opacity: "1", transform: "translateY(0)" },
			"100%": { opacity: "0", transform: "translateY(10px)" },
		  },
		  "slide-in": {
			"0%": { transform: "translateX(-20px)", opacity: "0" },
			"100%": { transform: "translateX(0)", opacity: "1" },
		  },
		  "slide-in-right": {
			"0%": { transform: "translateX(20px)", opacity: "0" },
			"100%": { transform: "translateX(0)", opacity: "1" },
		  },
		  "scale-in": {
			"0%": { transform: "scale(0.95)", opacity: "0" },
			"100%": { transform: "scale(1)", opacity: "1" },
		  },
		  "float": {
			"0%, 100%": { transform: "translateY(0)" },
			"50%": { transform: "translateY(-10px)" },
		  },
		  "pulse-slow": {
			"0%, 100%": { opacity: "1" },
			"50%": { opacity: "0.8" },
		  },
		  "rotate-slow": {
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.5s ease-out forwards",
		  "fade-out": "fade-out 0.2s ease-out",
		  "slide-in": "slide-in 0.3s ease-out forwards",
		  "slide-in-right": "slide-in-right 0.3s ease-out forwards",
		  "scale-in": "scale-in 0.2s ease-out",
		  "float": "float 5s ease-in-out infinite",
		  "pulse-slow": "pulse-slow 3s ease-in-out infinite",
		  "rotate-slow": "rotate-slow 8s linear infinite",

		  'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
		  'scale-out': 'scale-out 0.2s ease-out',
		  'bell-ring': 'bell-ring 1s ease-out',
		  'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
		  'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
  		  "check-mark": "check-mark 0.3s ease-out",
  		  "pulse-soft": "pulse-soft 2s ease-in-out infinite"
		},
		"check-mark": {
	  	"0%": { transform: "scale(0)" },
	  	"50%": { transform: "scale(1.2)" },
	  	"100%": { transform: "scale(1)" }
		},
		"pulse-soft": {
	 	"0%, 100%": { opacity: "1" },
	 	"50%": { opacity: "0.8" }
   }
},


	extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  modal: {
			background: "#1A1F2C",
			lighter: "#252B3D",
			border: "#2A324A"
		  },
		  sidebar: {
			DEFAULT: "hsl(var(--sidebar-background))",
			foreground: "hsl(var(--sidebar-foreground))",
			primary: "hsl(var(--sidebar-primary))",
			"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
			accent: "hsl(var(--sidebar-accent))",
			"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
			border: "hsl(var(--sidebar-border))",
			ring: "hsl(var(--sidebar-ring))",
		  },
		  taskapp: {
			dark: '#1A1F2C',
			darker: '#14171F',
			purple: '#8B5CF6',
			'purple-hover': '#7C3AED',
			'gray-light': '#C8C8C9',
			'gray-medium': '#9F9EA1',
			'gray-dark': '#403E43',
		},
		  chat: {
			dark: "#1A1F2C",
			darker: "#151822",
			lighter: "#2A2F3C",
			accent: "#8B5CF6",
			"accent-hover": "#7C4DEF",
			"message-bg": "#2D3348",
			"message-hover": "#343B52",
		  },
		  notification: {
			DEFAULT: '#1A1F2C',
			lighter: '#2A2F3C',
			accent: '#9b87f5',
			'accent-hover': '#8a76e4',
			danger: '#E57373',
			'danger-hover': '#D32F2F',
			success: '#81C784',
			'success-hover': '#4CAF50',
			text: '#FFFFFF',
			subtext: '#D6BCFA'
		},
		  telegram: {
			bg: "#1A1F2C",
			accent: "#8B5CF6",
			danger: "#F97316",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		  "fade-in": {
			"0%": { opacity: "0", transform: "translateY(10px)" },
			"100%": { opacity: "1", transform: "translateY(0)" },
		  },
		  "fade-out": {
			"0%": { opacity: "1", transform: "translateY(0)" },
			"100%": { opacity: "0", transform: "translateY(10px)" },
		  },
		  "slide-in": {
			"0%": { transform: "translateX(-20px)", opacity: "0" },
			"100%": { transform: "translateX(0)", opacity: "1" },
		  },
		  "slide-in-right": {
			"0%": { transform: "translateX(20px)", opacity: "0" },
			"100%": { transform: "translateX(0)", opacity: "1" },
		  },
		  "scale-in": {
			"0%": { transform: "scale(0.95)", opacity: "0" },
			"100%": { transform: "scale(1)", opacity: "1" },
		  },
		  "float": {
			"0%, 100%": { transform: "translateY(0)" },
			"50%": { transform: "translateY(-10px)" },
		  },
		  "pulse-slow": {
			"0%, 100%": { opacity: "1" },
			"50%": { opacity: "0.8" },
		  },
		  "rotate-slow": {
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.5s ease-out forwards",
		  "fade-out": "fade-out 0.2s ease-out",
		  "slide-in": "slide-in 0.3s ease-out forwards",
		  "slide-in-right": "slide-in-right 0.3s ease-out forwards",
		  "scale-in": "scale-in 0.2s ease-out",
		  "float": "float 5s ease-in-out infinite",
		  "pulse-slow": "pulse-slow 3s ease-in-out infinite",
		  "rotate-slow": "rotate-slow 8s linear infinite",

		  'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
		  'scale-out': 'scale-out 0.2s ease-out',
		  'bell-ring': 'bell-ring 1s ease-out',
		  'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
		  'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
  		  "check-mark": "check-mark 0.3s ease-out",
  		  "pulse-soft": "pulse-soft 2s ease-in-out infinite"
		},
		"check-mark": {
	  	"0%": { transform: "scale(0)" },
	  	"50%": { transform: "scale(1.2)" },
	  	"100%": { transform: "scale(1)" }
		},
		"pulse-soft": {
	 	"0%, 100%": { opacity: "1" },
	 	"50%": { opacity: "0.8" }
   }
},











 
 

 


  },
  plugins: [tailwind],
} satisfies Config;


*/







import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
/*	
	extend: {
	colors: {
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		},
		secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		},
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		},
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		},
		sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		},
		success: {
			DEFAULT: 'hsl(var(--success))',
			foreground: 'hsl(var(--success-foreground))'
		},
		warning: {
			DEFAULT: 'hsl(var(--warning))',
			foreground: 'hsl(var(--warning-foreground))'
		},
		info: {
			DEFAULT: 'hsl(var(--info))',
			foreground: 'hsl(var(--info-foreground))'
		}
	},
	borderRadius: {
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)'
	},
	keyframes: {
		'accordion-down': {
			from: {
				height: '0'
			},
			to: {
				height: 'var(--radix-accordion-content-height)'
			}
		},
		'accordion-up': {
			from: {
				height: 'var(--radix-accordion-content-height)'
			},
			to: {
				height: '0'
			}
		},
		'fade-in': {
			'0%': {
				opacity: '0',
				transform: 'translateY(10px)'
			},
			'100%': {
				opacity: '1',
				transform: 'translateY(0)'
			}
		}
	},
	animation: {
		'accordion-down': 'accordion-down 0.2s ease-out',
		'accordion-up': 'accordion-up 0.2s ease-out',
		'fade-in': 'fade-in 0.5s ease-out'
	}
	}
*/

extend: {
	colors: {
	  border: "hsl(var(--border))",
	  input: "hsl(var(--input))",
	  ring: "hsl(var(--ring))",
	  background: "hsl(var(--background))",
	  foreground: "hsl(var(--foreground))",
	  primary: {
		DEFAULT: "hsl(var(--primary))",
		foreground: "hsl(var(--primary-foreground))",
	  },
	  secondary: {
		DEFAULT: "hsl(var(--secondary))",
		foreground: "hsl(var(--secondary-foreground))",
	  },
	  destructive: {
		DEFAULT: "hsl(var(--destructive))",
		foreground: "hsl(var(--destructive-foreground))",
	  },
	  muted: {
		DEFAULT: "hsl(var(--muted))",
		foreground: "hsl(var(--muted-foreground))",
	  },
	  accent: {
		DEFAULT: "hsl(var(--accent))",
		foreground: "hsl(var(--accent-foreground))",
	  },
	  popover: {
		DEFAULT: "hsl(var(--popover))",
		foreground: "hsl(var(--popover-foreground))",
	  },
	  card: {
		DEFAULT: "hsl(var(--card))",
		foreground: "hsl(var(--card-foreground))",
	  },
	  modal: {
		background: "#1A1F2C",
		lighter: "#252B3D",
		border: "#2A324A"
	  },
	  sidebar: {
		DEFAULT: "hsl(var(--sidebar-background))",
		foreground: "hsl(var(--sidebar-foreground))",
		primary: "hsl(var(--sidebar-primary))",
		"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
		accent: "hsl(var(--sidebar-accent))",
		"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
		border: "hsl(var(--sidebar-border))",
		ring: "hsl(var(--sidebar-ring))",
	  },
	  taskapp: {
		dark: '#1A1F2C',
		darker: '#14171F',
		purple: '#8B5CF6',
		'purple-hover': '#7C3AED',
		'gray-light': '#C8C8C9',
		'gray-medium': '#9F9EA1',
		'gray-dark': '#403E43',
	},
	  chat: {
		dark: "#1A1F2C",
		darker: "#151822",
		lighter: "#2A2F3C",
		accent: "#8B5CF6",
		"accent-hover": "#7C4DEF",
		"message-bg": "#2D3348",
		"message-hover": "#343B52",
	  },
	  notification: {
		DEFAULT: '#1A1F2C',
		lighter: '#2A2F3C',
		accent: '#9b87f5',
		'accent-hover': '#8a76e4',
		danger: '#E57373',
		'danger-hover': '#D32F2F',
		success: '#81C784',
		'success-hover': '#4CAF50',
		text: '#FFFFFF',
		subtext: '#D6BCFA'
	},
	  telegram: {
		bg: "#1A1F2C",
		accent: "#8B5CF6",
		danger: "#F97316",
	  },
	},
	borderRadius: {
	  lg: "var(--radius)",
	  md: "calc(var(--radius) - 2px)",
	  sm: "calc(var(--radius) - 4px)",
	},
	keyframes: {
	  "accordion-down": {
		from: { height: "0" },
		to: { height: "var(--radix-accordion-content-height)" },
	  },
	  "accordion-up": {
		from: { height: "var(--radix-accordion-content-height)" },
		to: { height: "0" },
	  },
	  "fade-in": {
		"0%": { opacity: "0", transform: "translateY(10px)" },
		"100%": { opacity: "1", transform: "translateY(0)" },
	  },
	  "fade-out": {
		"0%": { opacity: "1", transform: "translateY(0)" },
		"100%": { opacity: "0", transform: "translateY(10px)" },
	  },
	  "slide-in": {
		"0%": { transform: "translateX(-20px)", opacity: "0" },
		"100%": { transform: "translateX(0)", opacity: "1" },
	  },
	  "slide-in-right": {
		"0%": { transform: "translateX(20px)", opacity: "0" },
		"100%": { transform: "translateX(0)", opacity: "1" },
	  },
	  "scale-in": {
		"0%": { transform: "scale(0.95)", opacity: "0" },
		"100%": { transform: "scale(1)", opacity: "1" },
	  },
	  "float": {
		"0%, 100%": { transform: "translateY(0)" },
		"50%": { transform: "translateY(-10px)" },
	  },
	  "pulse-slow": {
		"0%, 100%": { opacity: "1" },
		"50%": { opacity: "0.8" },
	  },
	  "rotate-slow": {
		"0%": { transform: "rotate(0deg)" },
		"100%": { transform: "rotate(360deg)" },
	  },
	},
	animation: {
	  "accordion-down": "accordion-down 0.2s ease-out",
	  "accordion-up": "accordion-up 0.2s ease-out",
	  "fade-in": "fade-in 0.5s ease-out forwards",
	  "fade-out": "fade-out 0.2s ease-out",
	  "slide-in": "slide-in 0.3s ease-out forwards",
	  "slide-in-right": "slide-in-right 0.3s ease-out forwards",
	  "scale-in": "scale-in 0.2s ease-out",
	  "float": "float 5s ease-in-out infinite",
	  "pulse-slow": "pulse-slow 3s ease-in-out infinite",
	  "rotate-slow": "rotate-slow 8s linear infinite",

	  'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
	  'scale-out': 'scale-out 0.2s ease-out',
	  'bell-ring': 'bell-ring 1s ease-out',
	  'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
	  'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
		"check-mark": "check-mark 0.3s ease-out",
		"pulse-soft": "pulse-soft 2s ease-in-out infinite"
	},
	"check-mark": {
	  "0%": { transform: "scale(0)" },
	  "50%": { transform: "scale(1.2)" },
	  "100%": { transform: "scale(1)" }
	},
	"pulse-soft": {
	 "0%, 100%": { opacity: "1" },
	 "50%": { opacity: "0.8" }
}
}



},
	plugins: [tailwind],
} satisfies Config;
