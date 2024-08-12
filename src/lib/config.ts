import type EditableText from './EditableText.svelte';

export type Text = {
	text: string;
	xPercent: number;
	yPercent: number;
	fontSize: number;
	editable: boolean;
	color: string;
	colorEditable?: boolean;
	el?: EditableText;
};

export type OverlayColor = {
	name: string;
	red: number;
	green: number;
	blue: number;
	alpha: number;
};

export const initialTextArray: Text[] = [
	{
		text: 'Meme, I embrace.',
		xPercent: 50,
		yPercent: 90,
		fontSize: 96,
		editable: true,
		color: 'white',
		colorEditable: true,
		el: undefined
	},
	{
		text: 'memepop.vercel.app',
		xPercent: 83.5,
		yPercent: 98,
		fontSize: 32,
		editable: false,
		color: 'black',
		el: undefined
	}
];

export type Config = {
	title: string;
	headerText: string;
	footerText: string;
	overlay?: {
		blankLabel: string;
		colors: OverlayColor[];
	};
};

export const config: Config = {
	title: 'MemePop',
	headerText: 'MemePop',
	footerText: 'Made with ❤️‍🔥 by @narze',
	overlay: {
		blankLabel: 'Change Overlay Color',
		colors: [
			{ name: 'Original', red: 0, green: 0, blue: 0, alpha: 0 },
			{ name: 'เขียว 1', red: 32, green: 90, blue: 65, alpha: 0.9 },
			{ name: 'เขียว 2', red: 103, green: 163, blue: 59, alpha: 0.9 },
			{ name: 'เขียว 3', red: 0, green: 192, blue: 139, alpha: 0.9 },
			{ name: 'ส้ม', red: 255, green: 180, blue: 73, alpha: 0.9 },
			{ name: 'เหลือง', red: 248, green: 223, blue: 82, alpha: 0.9 },
			{ name: 'น้ำเงิน', red: 0, green: 113, blue: 206, alpha: 0.9 },
			{ name: 'ม่วง', red: 72, green: 0, blue: 134, alpha: 0.9 },
			{ name: 'Red', red: 255, green: 0, blue: 0, alpha: 0.1 },
			{ name: 'Green', red: 50, green: 255, blue: 50, alpha: 0.5 },
			{ name: 'White', red: 255, green: 255, blue: 255, alpha: 1.0 }
		]
	}
};
