import posthog from '$lib/posthog';
import { base } from '$app/paths';

let audioContext: AudioContext | null = null;
let gongBuffer: AudioBuffer | null = null;

const SOUND_FILE = `${base}/sounds/gong.mp4`;

export function getAudioContext(): AudioContext {
	if (!audioContext) {
		audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
	}
	return audioContext;
}

export async function resumeAudioContext(): Promise<void> {
	try {
		const ctx = getAudioContext();
		if (ctx.state === 'suspended') {
			await ctx.resume();
		}
	} catch (err) {
		posthog.capture('audio_context_resume_failed', {
			error: String(err),
			user_agent: navigator.userAgent
		});
	}
}

export async function getGongBuffer(): Promise<AudioBuffer> {
	if (gongBuffer) return gongBuffer;

	try {
		const ctx = getAudioContext();

		const response = await fetch(SOUND_FILE);
		const contentType = response.headers.get('Content-Type');
		const contentLength = response.headers.get('Content-Length');

		const arrayBuffer = await response.arrayBuffer();
		try {
			gongBuffer = await ctx.decodeAudioData(arrayBuffer);
			return gongBuffer;
		} catch (decodeErr) {
			posthog.capture('audio_buffer_decode_failed', {
				status: response.status,
				ok: response.ok,
				content_type: contentType,
				content_length: contentLength,
				error: String(decodeErr),
				byte_length: arrayBuffer.byteLength,
				url: SOUND_FILE,
				language: navigator.language
			});
			throw decodeErr;
		}
	} catch (err) {
		posthog.capture('audio_buffer_load_failed', {
			error: String(err),
			user_agent: navigator.userAgent
		});
		throw err;
	}
}

export async function preloadGong(): Promise<void> {
	try {
		await resumeAudioContext();
		await getGongBuffer();
	} catch (err) {
		posthog.capture('audio_preload_failed', {
			error: String(err),
			user_agent: navigator.userAgent
		});
	}
}
