// src/html.d.ts

declare global {
	declare module "@types/react" {
		interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
			bcg?: string;
		}
	}
}
