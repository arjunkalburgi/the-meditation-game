import posthog from '$lib/posthog';

let audioContext: AudioContext | null = null;
let gongBuffer: AudioBuffer | null = null;

const SOUND_FILE = '/sounds/gong.mp4';

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

		const response = await fetch(SOUND_FILE);
		const contentType = response.headers.get('Content-Type');
		const contentLength = response.headers.get('Content-Length');

		posthog.capture('audio_fetch_response', {
			status: response.status,
			ok: response.ok,
			content_type: contentType,
			content_length: contentLength,
			user_agent: navigator.userAgent
		});

		const arrayBuffer = await response.arrayBuffer();

		posthog.capture('audio_arraybuffer_fetched', {
			byte_length: arrayBuffer.byteLength,
			user_agent: navigator.userAgent
		});

		try {
			gongBuffer = await ctx.decodeAudioData(arrayBuffer);
			posthog.capture('audio_buffer_loaded', {
				buffer_byte_length: arrayBuffer.byteLength,
				user_agent: navigator.userAgent
			});
			return gongBuffer;
		} catch (decodeErr) {
			posthog.capture('audio_buffer_decode_failed', {
				error: String(decodeErr),
				byte_length: arrayBuffer.byteLength,
				content_type: contentType,
				url: SOUND_FILE,
				user_agent: navigator.userAgent,
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
