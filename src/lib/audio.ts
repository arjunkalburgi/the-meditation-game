import posthog from '$lib/posthog';

let audioContext: AudioContext | null = null;
let gongBuffer: AudioBuffer | null = null;

export function getAudioContext(): AudioContext {
	if (!audioContext) {
		audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		posthog.capture('audio_context_created', {
			state: audioContext.state,
			user_agent: navigator.userAgent
		});
	}
	return audioContext;
}

export async function resumeAudioContext(): Promise<void> {
	try {
		const ctx = getAudioContext();
		if (ctx.state === 'suspended') {
			await ctx.resume();
			posthog.capture('audio_context_resumed', {
				state: ctx.state,
				user_agent: navigator.userAgent
			});
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
		const response = await fetch('/sounds/gong.m4a');
		const arrayBuffer = await response.arrayBuffer();
		gongBuffer = await ctx.decodeAudioData(arrayBuffer);
		posthog.capture('audio_buffer_loaded', {
			buffer_byte_length: arrayBuffer.byteLength,
			user_agent: navigator.userAgent
		});
		return gongBuffer;
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
		posthog.capture('audio_preload_success', {
			user_agent: navigator.userAgent
		});
	} catch (err) {
		posthog.capture('audio_preload_failed', {
			error: String(err),
			user_agent: navigator.userAgent
		});
	}
}
