/**
 * Procedural Web Audio engine for Cadence Gen Z Music Blog.
 * Generates genuine real-time audio demonstrations matching each viral/modern music topic.
 */

let audioCtx: AudioContext | null = null;
let currentNodes: { stop: () => void } | null = null;
let activePreset: string | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopCurrentAudio() {
  if (currentNodes) {
    try {
      currentNodes.stop();
    } catch {
      // ignore already stopped nodes
    }
    currentNodes = null;
  }
  activePreset = null;
}

export function getActiveAudioPreset(): string | null {
  return activePreset;
}

export function playAudioPreset(preset: string, onStop?: () => void): () => void {
  stopCurrentAudio();
  const ctx = getAudioContext();
  activePreset = preset;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.1);
  masterGain.connect(ctx.destination);

  let isPlaying = true;
  const timers: number[] = [];

  const handleStop = () => {
    if (!isPlaying) return;
    isPlaying = false;
    timers.forEach(t => clearTimeout(t));
    if (activePreset === preset) {
      activePreset = null;
    }
    try {
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      setTimeout(() => {
        try {
          masterGain.disconnect();
        } catch {
          // ignore
        }
        if (onStop) onStop();
      }, 160);
    } catch {
      if (onStop) onStop();
    }
  };

  currentNodes = { stop: handleStop };

  switch (preset) {
    case 'shoegaze-glide': {
      // Shimmering Kevin Shields glide guitar: continuous tremolo arm detuning + washed reverb
      const freqs = [196.00, 246.94, 293.66, 392.00]; // G add9 chord
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);

      const tremoloArm = ctx.createOscillator();
      const tremoloDepth = ctx.createGain();
      tremoloArm.frequency.setValueAtTime(1.1, ctx.currentTime);
      tremoloDepth.gain.setValueAtTime(18, ctx.currentTime); // cents bend
      tremoloArm.start();

      freqs.forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        tremoloArm.connect(osc.detune);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 7.0);

        osc.connect(filter);
        osc.start();
        osc.stop(ctx.currentTime + 7.1);
      });

      filter.connect(masterGain);
      const endTimer = window.setTimeout(() => handleStop(), 7200);
      timers.push(endTimer);
      break;
    }

    case 'amen-break': {
      // 168 BPM energetic breakbeat pattern (PinkPantheress / Jungle / Breakcore style)
      const tempo = 168;
      const beatLen = 60 / tempo;
      const sixteenth = beatLen / 4;

      const pattern: [number, 'kick' | 'snare' | 'hat' | 'ghost', number][] = [
        [0, 'kick', 125],
        [2, 'hat', 4500],
        [4, 'snare', 290],
        [6, 'hat', 4500],
        [7, 'ghost', 220],
        [8, 'kick', 120],
        [10, 'kick', 115],
        [12, 'snare', 300],
        [14, 'hat', 4500],
        [15, 'ghost', 240],
      ];

      const playHit = (type: 'kick' | 'snare' | 'hat' | 'ghost', freq: number) => {
        if (!isPlaying) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (type === 'kick') {
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.7, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.22);
        } else if (type === 'snare' || type === 'ghost') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(type === 'snare' ? 0.65 : 0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } else {
          // Hi-hat
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 6500;
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }
      };

      let loopCount = 0;
      const playBar = () => {
        if (!isPlaying || loopCount >= 5) return;
        pattern.forEach(([step, type, freq]) => {
          const t = window.setTimeout(() => playHit(type, freq), step * sixteenth * 1000);
          timers.push(t);
        });
        loopCount++;
        const nextBarTimer = window.setTimeout(playBar, 16 * sixteenth * 1000);
        timers.push(nextBarTimer);
      };

      playBar();
      const endTimer = window.setTimeout(() => handleStop(), 8000);
      timers.push(endTimer);
      break;
    }

    case 'dilla-swing': {
      // Unquantized late snare, lazy swung hi-hats, and velvet Rhodes major 9th chord
      const chord = [207.65, 261.63, 311.13, 392.00, 466.16]; // Ab Maj9
      chord.forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.2);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 5.4);
      });

      const drumSequence = [
        { time: 0.0, type: 'kick' },
        { time: 0.32, type: 'hat' },
        { time: 0.68, type: 'snare_late' }, // 35ms behind the grid!
        { time: 0.96, type: 'hat' },
        { time: 1.26, type: 'kick' },
        { time: 1.49, type: 'kick_double' },
        { time: 1.89, type: 'snare_late' }
      ];

      drumSequence.forEach(hit => {
        const timer = window.setTimeout(() => {
          if (!isPlaying) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          if (hit.type.includes('kick')) {
            osc.frequency.setValueAtTime(95, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.6, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          } else if (hit.type.includes('snare')) {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(210, ctx.currentTime);
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          } else {
            osc.type = 'square';
            osc.frequency.setValueAtTime(3000, ctx.currentTime);
            gain.gain.setValueAtTime(0.09, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
          }
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }, hit.time * 1000);
        timers.push(timer);
      });

      const endTimer = window.setTimeout(() => handleStop(), 6000);
      timers.push(endTimer);
      break;
    }

    case 'slowed-reverb': {
      // Pitch-shifted down -4 semitones with long cathedral reverb and low-pass filter
      const notes = [196.00, 233.08, 293.66, 349.23]; // Bb Minor 7 pitched down
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, ctx.currentTime); // muffled vintage filter
      filter.Q.value = 2;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.4 + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6.5);

        osc.connect(filter);
        osc.start();
        osc.stop(ctx.currentTime + 6.6);
      });

      filter.connect(masterGain);
      const endTimer = window.setTimeout(() => handleStop(), 7000);
      timers.push(endTimer);
      break;
    }

    case 'japanese-ambient': {
      // Hiroshi Yoshimura style crystalline pentatonic bell chimes + gentle rain
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];

      // Soft rain noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 750;

      whiteNoise.connect(rainFilter);
      rainFilter.connect(masterGain);
      whiteNoise.start();

      let chimeCount = 0;
      const chimeLoop = () => {
        if (!isPlaying || chimeCount >= 8) return;
        const note = notes[Math.floor(Math.random() * notes.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 3.1);

        chimeCount++;
        const nextTime = 700 + Math.random() * 800;
        const timer = window.setTimeout(chimeLoop, nextTime);
        timers.push(timer);
      };

      chimeLoop();
      const endTimer = window.setTimeout(() => handleStop(), 9000);
      timers.push(endTimer);
      break;
    }

    case '808-bass-slide': {
      // Modern Trap/Drill distorted 808 sub-bass with dramatic pitch slide + rolling hi-hats
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1
      // 808 slide up to high note at 1.2s!
      subOsc.frequency.setValueAtTime(55, ctx.currentTime + 0.8);
      subOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1.2); // slide to A2
      subOsc.frequency.exponentialRampToValueAtTime(48, ctx.currentTime + 2.0); // slide down

      subGain.gain.setValueAtTime(0.65, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4.5);

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 4.6);

      // Fast rolling trap hi-hats
      for (let i = 0; i < 16; i++) {
        const hatTimer = window.setTimeout(() => {
          if (!isPlaying) return;
          const osc = ctx.createOscillator();
          const hatGain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = 7000;
          hatGain.gain.setValueAtTime(i % 4 === 0 ? 0.12 : 0.06, ctx.currentTime);
          hatGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
          osc.connect(hatGain);
          hatGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        }, i * 110);
        timers.push(hatTimer);
      }

      const endTimer = window.setTimeout(() => handleStop(), 5000);
      timers.push(endTimer);
      break;
    }

    case 'vinyl-sample-chop': {
      // Madlib / MF DOOM style chopped 12-bit sample with vinyl crackle
      const chords = [
        [220, 261.63, 329.63, 392], // A minor 7
        [196, 246.94, 293.66, 370], // G Maj7
        [174.61, 220, 261.63, 329.63] // F Maj7
      ];

      chords.forEach((chord, idx) => {
        const timer = window.setTimeout(() => {
          if (!isPlaying) return;
          chord.forEach(f => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            gain.gain.setValueAtTime(0.001, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 1.3);
          });
        }, idx * 1100);
        timers.push(timer);
      });

      const endTimer = window.setTimeout(() => handleStop(), 5500);
      timers.push(endTimer);
      break;
    }

    case 'afrobeats-clave': {
      // Modern Burna Boy / Asake 3:2 clave groove with hollow log drum pulse
      const stepMs = 175;
      let step = 0;

      const triggerDrum = (freq: number, decay: number, gainVal: number) => {
        if (!isPlaying) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + decay);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + decay);
      };

      const loop = () => {
        if (!isPlaying) return;
        // Log drum bass bounce
        if (step % 4 === 0) triggerDrum(85, 0.25, 0.7);
        if (step === 3 || step === 6 || step === 10 || step === 12) triggerDrum(160, 0.12, 0.5); // syncopation
        step = (step + 1) % 16;
        const t = window.setTimeout(loop, stepMs);
        timers.push(t);
      };

      loop();
      const endTimer = window.setTimeout(() => handleStop(), 6000);
      timers.push(endTimer);
      break;
    }

    case 'analog-tape-warmth': {
      // Two warm saw waves with thermal drift and tape wow LFO
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime);
      osc2.frequency.setValueAtTime(131.25, ctx.currentTime);

      lfo.frequency.setValueAtTime(0.85, ctx.currentTime);
      lfoGain.gain.setValueAtTime(3.0, ctx.currentTime);
      lfo.connect(osc1.detune);
      lfo.connect(osc2.detune);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 2.5);
      filter.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 5.0);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.3;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);

      osc1.start();
      osc2.start();
      lfo.start();

      const endTimer = window.setTimeout(() => handleStop(), 7000);
      timers.push(endTimer);
      break;
    }

    case 'tiktok-mastering-test': {
      // A/B test: Dynamic master vs heavily limited/clipped smartphone audio
      const playA = () => {
        // Dynamic punch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 1.9);
      };

      const playB = () => {
        // Crushed brickwall phone limit
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.45, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 2.0);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 2.1);
      };

      playA();
      const timer = window.setTimeout(() => {
        if (!isPlaying) return;
        playB();
      }, 2400);
      timers.push(timer);

      const endTimer = window.setTimeout(() => handleStop(), 6000);
      timers.push(endTimer);
      break;
    }

    default:
      handleStop();
      break;
  }

  return handleStop;
}
