import type EditableText from './EditableText.svelte';

export type Text = {
	text: string;
	xPercent: number;
	yPercent: number;
	fontSize: number;
	editable: boolean;
	color: string;
	el?: EditableText;
};

export const initialTextArray: Text[] = [
	{
		text: 'Meme, I embrace.',
		xPercent: 50,
		yPercent: 90,
		fontSize: 96,
		editable: true,
		color: 'white',
		el: undefined
	},
	{
		text: 'memepop.vercel.app',
		xPercent: 85,
		yPercent: 98.5,
		fontSize: 32,
		editable: false,
		color: 'black',
		el: undefined
	}
];

export const config = {
	title: 'MemePop'
};
