import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'shoegaze-revival-lore',
    title: 'Why Is Gen Z Obsessed with Shoegaze? Decoding the Wall of Sound & 90s Fuzz',
    subtitle: 'From Panchiko and Wisp blowing up on TikTok to My Bloody Valentine, why the youth traded hyper-clean pop for a sensory cocoon of screaming guitar feedback.',
    category: 'Shoegaze & Alt-Rock',
    vibe: 'Late Night Fuzz',
    readTime: '6 min read',
    publishedDate: 'October 3, 2026',
    featured: true,
    author: {
      name: 'Maya Chen',
      role: 'Music Critic & Pedalboard Addict',
      avatarInitials: 'MC',
      bio: 'Writing on Gen Z subcultures, indie guitar resurgence, and bedroom dream pop.'
    },
    coverImage: '/src/assets/images/shoegaze_guitar_pedalboard_1791176366842.jpg',
    imageCaption: 'Fig. 1 — Offset Fender Jazzmaster with floating tremolo arm engaged through cascading reverse reverb racks.',
    excerpt: 'Shoegaze isn’t just music; it’s an acoustic weighted blanket. In a sensory-overloaded world, drowning in 100 decibels of ethereal guitar reverb is the ultimate sanctuary.',
    keyTrack: {
      title: 'Soon',
      artist: 'My Bloody Valentine',
      year: '1991',
      significance: 'Glide guitar technique: continuously bending the tremolo bar while strumming through reverse reverb.',
      audioPreset: 'shoegaze-glide',
      presetLabel: 'Glide Guitar & Reverse Reverb Fuzz',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fe/59/36/fe59362a-1afe-771e-c2d4-51d6f0cd421b/mzaf_2749868154268335245.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/my%20bloody%20valentine%20soon'
    },
    sections: [
      {
        heading: 'The TikTok Fuzz Wave',
        paragraphs: [
          'If you spent any time on TikTok or Discord in the last two years, you witnessed an improbable miracle: teenager bedrooms illuminated by purple LED strips, soundtracked not by auto-tuned pop, but by the apocalyptic roar of distorted Fender Jazzmasters.',
          'Bands like Panchiko—whose 2000 demo tape was famously recovered from a Nottingham thrift store by Reddit internet detectives—and 19-year-old bedroom producer Wisp proved that shoegaze speaks directly to Gen Z. But why does music recorded in 1991 feel so urgent in 2026?'
        ],
        pullQuote: 'It sounds like your feelings are too loud for your body, so the guitar screams them for you.',
        quoteAttribution: 'Wisp, on why shoegaze blew up online'
      },
      {
        heading: 'The "Glide Guitar" Secret',
        paragraphs: [
          'The architectural core of the shoegaze sound was invented by Kevin Shields of My Bloody Valentine on their 1991 opus Loveless. Shields did not use fifty guitar overdubs; he used a technique called "glide guitar."',
          'By holding the tremolo arm loosely between his fingers while strumming full barre chords, the pitch wavers continuously by 15 to 25 cents. When fed into an Alesis Midiverb II running patch 45 (Reverse Reverb), the pick attack disappears. The guitar stops sounding like wood and metal; it turns into a choir of jet engines.'
        ],
        gearInsight: {
          device: 'Alesis Midiverb II & ProCo Rat',
          description: 'The definitive shoegaze combo: a cheap 16-bit reverse reverb running into a gritty silicon diode distortion pedal.'
        }
      },
      {
        heading: 'Acoustic Cocooning for an Anxious Generation',
        paragraphs: [
          'Psychologists and musicologists note that the physical sensation of shoegaze provides what is known as "sonic cocooning." The bass and guitar overtones occupy every single frequency from 40 Hz to 12 kHz simultaneously.',
          'In an era defined by notifications, doomscrolling, and fragmented micro-content, putting on noise-cancelling AirPods and playing Loveless forces complete mental surrender. The world outside disappears into beautiful, blissful noise.'
        ],
        listeningNotes: [
          'Notice how the vocals are buried level with the guitars, making words feel like another instrument.',
          'Listen for the continuous pitch wobble on chord strums.',
          'Feel how the low-end fuzz vibrates in your chest.'
        ]
      }
    ],
    tags: ['Shoegaze', 'TikTok Music', 'My Bloody Valentine', 'Dream Pop', 'Guitar Pedals'],
    recommendedAlbums: [
      { album: 'Loveless', artist: 'My Bloody Valentine', year: '1991', label: 'Creation' },
      { album: 'D>E>A>T>H>M>E>T>A>L', artist: 'Panchiko', year: '2000', label: 'Self-Released' },
      { album: 'Souvlaki', artist: 'Slowdive', year: '1993', label: 'Creation' }
    ]
  },
  {
    id: 'amen-break-viral-genealogy',
    title: 'The 6-Second Drum Solo in 6,000 Songs: The Lore of the Amen Break',
    subtitle: 'From an obscure 1969 soul B-side to PinkPantheress, Jungle, Breakcore, and TikTok speed runs.',
    category: 'Breakbeats & Jungle',
    vibe: 'Hyper Speed',
    readTime: '5 min read',
    publishedDate: 'October 1, 2026',
    featured: true,
    author: {
      name: 'Kai Washington',
      role: 'Club DJ & Sample Historian',
      avatarInitials: 'KW',
      bio: 'Tracking internet breakcore communities and the evolution of British bass music.'
    },
    coverImage: '/src/assets/images/music_drum_machine_studio_1791175537592.jpg',
    imageCaption: 'Fig. 2 — Akai S950 hardware sampler loaded with chopped 12-bit breakbeat slices.',
    excerpt: 'In 1969, a drummer named Gregory Coleman played 4 bars of drums for an instrumental B-side. Today, his hands are the beating pulse of TikTok drum & bass.',
    keyTrack: {
      title: 'Amen Brother',
      artist: 'The Winstons',
      year: '1969',
      significance: 'The original 4-bar drum break that birthed modern Jungle, Drum & Bass, and Breakcore.',
      audioPreset: 'amen-break',
      presetLabel: '168 BPM Chopped Amen Break',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/13/a9/95/13a995f1-f13c-7310-8f28-98afc6650d3f/mzaf_12501176371929270962.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/the%20winstons%20amen%20brother'
    },
    sections: [
      {
        heading: 'Six Seconds That Never Died',
        paragraphs: [
          'If you’ve heard PinkPantheress, NewJeans, The Prodigy, or any anime breakcore edit on YouTube, you have heard Gregory Sylvester Coleman play the drums.',
          'In 1969, Coleman sat behind his kit for The Winstons to record "Amen, Brother." At the 1:26 mark, the horns cut out. Coleman played four bars of solo drums. It lasted exactly six seconds. In those six seconds, he played a syncopated ghost-snare on beat two that defied standard meter.'
        ],
        pullQuote: 'The Amen break is the open-source Linux kernel of modern dance music.',
        quoteAttribution: 'Goldie, Jungle Legend'
      },
      {
        heading: 'Why It Gives Gen Z Dopamine',
        paragraphs: [
          'Why does a 1969 soul break hit so hard in 2026? Because when you pitch it up from 136 BPM to 170 BPM, the snare snaps into a sharp whip crack, and the ride cymbal becomes a hyperactive heartbeat.',
          'Producers chop the break into 16th-note fragments and rearrange them. It matches the lightning-fast pacing of the modern web: relentless, kinetic, and endlessly reconfigurable.'
        ],
        gearInsight: {
          device: 'E-mu SP-1200 & Akai S950',
          description: '12-bit hardware samplers that added crunch, punchy lower mid-range, and instant pitch-shifting to vintage drum loops.'
        }
      }
    ],
    tags: ['Breakcore', 'Amen Break', 'PinkPantheress', 'Jungle', 'Sampling'],
    recommendedAlbums: [
      { album: 'to hell with it', artist: 'PinkPantheress', year: '2021', label: 'Parlophone' },
      { album: 'Timeless', artist: 'Goldie', year: '1995', label: 'FFRR' },
      { album: 'Selected Ambient Works 85-92', artist: 'Aphex Twin', year: '1992', label: 'Apollo' }
    ]
  },
  {
    id: 'dilla-swing-neo-soul',
    title: 'The Dilla Swing: Why the "Drunk Beat" Makes SZA, Tyler, and Frank Ocean Hit Different',
    subtitle: 'How an MPC with quantize turned off rewrote the laws of rhythm and taught a generation of producers how to groove.',
    category: 'Hip-Hop & R&B',
    vibe: 'Velvet Pocket',
    readTime: '7 min read',
    publishedDate: 'September 26, 2026',
    featured: true,
    author: {
      name: 'Jordan Reed',
      role: 'Beatmaker & Groove Theorist',
      avatarInitials: 'JR',
      bio: 'Producer analyzing micro-timing and vernacular pocket drumming in modern R&B.'
    },
    coverImage: '/src/assets/images/mpc_sampler_bedroom_1791176379223.jpg',
    imageCaption: 'Fig. 3 — Vintage Akai MPC with wooden side panels and MPC pads in a late-night studio.',
    excerpt: 'Your favorite tracks by SZA and Tyler, The Creator sound loose and hypnotic because the drums are intentionally off-grid. Meet the genius of J Dilla.',
    keyTrack: {
      title: "Didn't Cha Know",
      artist: 'Erykah Badu (prod. J Dilla)',
      year: '2000',
      significance: 'Delayed snare hits 30 milliseconds behind the downbeat, creating the trademark falling-backward pocket.',
      audioPreset: 'dilla-swing',
      presetLabel: 'Unquantized Drunk Drums & Rhodes Chord',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ac/09/d9/ac09d9cb-7234-ad06-7657-41adc3fe1732/mzaf_2376722871755655843.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/erykah%20badu%20didnt%20cha%20know'
    },
    sections: [
      {
        heading: 'Turning Off the Grid',
        paragraphs: [
          'In early 90s hip-hop, drum machines locked everything to an exact mathematical grid. Every kick was on beat one; every snare was locked to beats two and four. It sounded clean, but robotic.',
          'Then came James Dewitt Yancey—J Dilla. Working in his Detroit basement with an Akai MPC3000, Dilla made a radical decision: he turned off the auto-quantize function. He finger-drummed his beats live into the machine, letting his natural human micro-timing breathe.'
        ],
        pullQuote: 'Dilla’s drums felt like walking down the stairs in the dark and finding an extra step you didn’t know was there.',
        quoteAttribution: 'Questlove'
      },
      {
        heading: 'The 35-Millisecond Magic',
        paragraphs: [
          'In music theory, this is called "micro-timing." Dilla would place the kick drum slightly early (rushing) and the snare drum 30 to 45 milliseconds late (dragging).',
          'This creates an irresistible gravitational lean: the song feels as if it’s casually stumbling backward into a plush velvet couch without ever losing the groove. Today, you hear it in the stuttering production of Tyler, The Creator, Steve Lacy, and SZA.'
        ],
        listeningNotes: [
          'Listen closely to the snare on beat two: it lands visibly later than your brain expects.',
          'Notice how the hi-hats swing between straight 16ths and shuffle triplets.',
          'Feel the relaxed, unhurried posture the groove gives to the vocalist.'
        ]
      }
    ],
    tags: ['J Dilla', 'SZA', 'Tyler The Creator', 'Lo-Fi', 'MPC3000'],
    recommendedAlbums: [
      { album: 'Donuts', artist: 'J Dilla', year: '2006', label: 'Stones Throw' },
      { album: 'SOS', artist: 'SZA', year: '2022', label: 'Top Dawg / RCA' },
      { album: 'IGOR', artist: 'Tyler, The Creator', year: '2019', label: 'Columbia' }
    ]
  },
  {
    id: 'slowed-and-reverb-psychology',
    title: 'Slowed + Reverb Culture: The Sonic Psychology of Internet Nostalgia & Screwed Music',
    subtitle: 'From Houston’s legendary DJ Screw to YouTube 3AM edits: why dropping pitch by 4 semitones triggers profound emotional release.',
    category: 'Internet Aesthetics',
    vibe: '3AM Nostalgia',
    readTime: '6 min read',
    publishedDate: 'September 22, 2026',
    featured: false,
    author: {
      name: 'Maya Chen',
      role: 'Internet Culture Columnist',
      avatarInitials: 'MC',
      bio: 'Investigating audio memes, vaporwave history, and online listening rituals.'
    },
    coverImage: '/src/assets/images/cassette_walkman_neon_1791176393199.jpg',
    imageCaption: 'Fig. 4 — Translucent cassette tape inside portable player on a neon-lit rainy night.',
    excerpt: 'Why does pitching down a pop song by 15% and drowning it in cathedral reverb make millions of people feel like crying over memories they never had?',
    keyTrack: {
      title: 'Chamber Of Reflection',
      artist: 'Mac DeMarco',
      year: '2014',
      significance: 'Demonstrating how tape deceleration creates psychological time-dilation and vocal intimacy.',
      audioPreset: 'slowed-reverb',
      presetLabel: 'Pitched-Down Muffled Tape & Deep Reverb',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6e/8b/6b/6e8b6b9d-0881-6810-11d9-fa081cf37d81/mzaf_15689875906597339969.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/mac%20demarco%20chamber%20of%20reflection'
    },
    sections: [
      {
        heading: 'The Houston Origins',
        paragraphs: [
          'Long before YouTube channels with anime rain thumbnails racked up 50 million views on "Slowed + Reverb" uploads, Robert Earl Davis Jr.—known as DJ Screw—invented the form in South Houston in the 1990s.',
          'Using two turntables and cassette decks, DJ Screw manually pitched vinyl records down from 45 RPM to 33 RPM. He dubbed it "chopped and screwed." The slowed tempo transformed fast Southern rap into syrup-thick psychological odysseys.'
        ],
        pullQuote: 'When you slow the music down, you hear the ghost inside the tape.',
        quoteAttribution: 'DJ Screw'
      },
      {
        heading: 'The Neuroscience of Pitch Drop',
        paragraphs: [
          'When audio frequency is lowered, two things happen to your brain: vocal formants drop into a deeper register, which human psychology associates with intimacy, vulnerability, and safety.',
          'Meanwhile, adding a 4-second reverb decay gives the sound artificial physical dimensions: your brain perceives the music as originating inside an empty stadium or a cavernous cathedral at midnight. It produces an instantaneous ache known as anemoia—nostalgia for a time you never lived.'
        ]
      }
    ],
    tags: ['Slowed + Reverb', 'DJ Screw', 'Vaporwave', 'Internet Culture', 'Nostalgia'],
    recommendedAlbums: [
      { album: '3 N’ Tha Mornin’', artist: 'DJ Screw', year: '1995', label: 'Bigtyme Recordz' },
      { album: 'Floral Shoppe', artist: 'Macintosh Plus', year: '2011', label: 'Beer on the Rug' },
      { album: 'Salad Days', artist: 'Mac DeMarco', year: '2014', label: 'Captured Tracks' }
    ]
  },
  {
    id: 'japanese-ambient-youtube-rabbit-hole',
    title: 'The Japanese Ambient Rabbit Hole: Why Millions of Students Study to Hiroshi Yoshimura',
    subtitle: 'How 1980s corporate lobby music became the ultimate internet study soundtrack and sensory detox.',
    category: 'Ambient & Study',
    vibe: 'Study Zen',
    readTime: '6 min read',
    publishedDate: 'September 18, 2026',
    featured: false,
    author: {
      name: 'Yuki Tanaka',
      role: 'Archival Sound Researcher',
      avatarInitials: 'YT',
      bio: 'Curator of Showa-era environmental electronics and minimalist sound installations.'
    },
    coverImage: '/src/assets/images/music_ambient_garden_1791175527265.jpg',
    imageCaption: 'Fig. 5 — Kyoto courtyard garden in morning mist with minimalist architectural acoustic glass.',
    excerpt: 'How music commissioned for Tokyo subway stations and Muji stores in 1982 became the antidote to modern digital burnout.',
    keyTrack: {
      title: 'Water Copy',
      artist: 'Hiroshi Yoshimura',
      year: '1982',
      significance: 'Minimalist Yamaha DX7 pentatonic bells composed to blend with the sound of trickling museum fountains.',
      audioPreset: 'japanese-ambient',
      presetLabel: 'Kankyo Pentatonic Bells & Raindrops',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ff/95/87/ff958735-f448-0909-6cf5-d93594ae1968/mzaf_13648969512405811054.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/hiroshi%20yoshimura%20water%20copy'
    },
    sections: [
      {
        heading: 'The Miracle of the YouTube Algorithm',
        paragraphs: [
          'In late 2017, the YouTube recommendation algorithm started doing something bizarre: it began recommending a 1982 album called Music for Nine Post Cards by Japanese composer Hiroshi Yoshimura to millions of stressed-out high school and college students.',
          'The comments section turned into an online temple of peaceful confession: students studying for organic chemistry finals, coders debugging at 4 AM, and gamers winding down from competitive lobbies. The music was completely devoid of hooks, choruses, or vocal ego.'
        ],
        pullQuote: 'Music shouldn’t demand to be the star. It should exist in the room like clean air or light coming through a window.',
        quoteAttribution: 'Hiroshi Yoshimura'
      },
      {
        heading: 'Kankyo Ongaku: Environmental Sound',
        paragraphs: [
          'In Japan, this genre was named Kankyo Ongaku (environmental music). Yoshimura and peers like Midori Takada didn’t compose for concert halls; they composed for department store elevators, subway ticket counters, and modern architectural spaces.',
          'Using early crystalline digital synthesizers like the Yamaha DX7, they crafted delicate bell tones that decayed into room acoustics. For Gen Z, who spend 8 hours a day processing hyper-stimulating short-form video, this music functions as an acoustic reset button.'
        ]
      }
    ],
    tags: ['Ambient', 'Hiroshi Yoshimura', 'Study Music', 'Japan', 'Lo-Fi'],
    recommendedAlbums: [
      { album: 'Music for Nine Post Cards', artist: 'Hiroshi Yoshimura', year: '1982', label: 'Sound Process' },
      { album: 'Through the Looking Glass', artist: 'Midori Takada', year: '1983', label: 'RCA Red Seal' },
      { album: 'Green', artist: 'Hiroshi Yoshimura', year: '1986', label: 'Sunchild' }
    ]
  },
  {
    id: '808-sub-bass-trap-drill',
    title: '808s and Sub-Bass Physics: How a Failed 1980 Drum Machine Took Over Modern Trap & Drill',
    subtitle: 'From Roland’s biggest commercial flop to Metro Boomin, Carti, and the pitch-bending slides of UK and Brooklyn drill.',
    category: 'Bass & Trap',
    vibe: 'Bass Heavy',
    readTime: '6 min read',
    publishedDate: 'September 12, 2026',
    featured: false,
    author: {
      name: 'Devon Clarke',
      role: 'Audio Engineer & Bass Enthusiast',
      avatarInitials: 'DC',
      bio: 'Producer specializing in low-end phase alignment and trap sub-bass saturation.'
    },
    coverImage: '/src/assets/images/sound_system_bass_1791176406764.jpg',
    imageCaption: 'Fig. 6 — Massive festival sound system subwoofer stack vibrating with heavy sub-bass in warehouse haze.',
    excerpt: 'In 1980, musicians hated the Roland TR-808 because it didn’t sound like real drums. Four decades later, its sine-wave bassline shakes every car on earth.',
    keyTrack: {
      title: 'Ric Flair Drip',
      artist: 'Offset & Metro Boomin',
      year: '2017',
      significance: 'The evolution from straight sustained sub-bass kicks to gliding, distorted drill pitch bends.',
      audioPreset: '808-bass-slide',
      presetLabel: 'Gliding 808 Sub-Bass & Trap Roll',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c4/ed/19/c4ed194e-08f2-01f9-1733-a52869053ee1/mzaf_867991296654303507.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/metro%20boomin%20ric%20flair%20drip'
    },
    sections: [
      {
        heading: 'Roland’s Beautiful Failure',
        paragraphs: [
          'When Ikutaro Kakehashi engineered the Roland TR-808 in 1980, his goal was to create a drum machine that sounded like a real drummer for lounge acts. It failed miserably. The bass drum didn’t sound like a wooden kick drum at all—it was a pure, booming analog sine-wave oscillator with a long decay circuit.',
          'Roland discontinued it after just 12,000 units. But cheap second-hand 808s landed in the hands of early hip-hop pioneers in the Bronx and Miami bass producers. What engineers saw as a flaw, street musicians recognized as an earthquake.'
        ],
        pullQuote: 'The 808 is the heartbeat of hip-hop. If your chest isn’t rattling, the beat isn’t finished.',
        quoteAttribution: 'Metro Boomin'
      },
      {
        heading: 'The Drill Slide Revolution',
        paragraphs: [
          'In contemporary drill music (from London to Brooklyn and Paris), producers like 808Melo and AXLE took the 808 and did something revolutionary: portamento slides.',
          'By gliding the pitch of the 808 up an octave while adding tube saturation distortion, the bass ceased being merely rhythmic. The 808 became the lead instrument—a melodic, roaring acoustic beast that carries the entire harmonic weight of the track.'
        ]
      }
    ],
    tags: ['808', 'Trap', 'Drill', 'Sub Bass', 'Metro Boomin'],
    recommendedAlbums: [
      { album: 'HEROES & VILLAINS', artist: 'Metro Boomin', year: '2022', label: 'Boominati / Republic' },
      { album: 'Die Lit', artist: 'Playboi Carti', year: '2018', label: 'AWGE / Interscope' },
      { album: 'Meet the Woo', artist: 'Pop Smoke', year: '2019', label: 'Victor Victor' }
    ]
  },
  {
    id: 'art-of-the-sample-chop',
    title: 'The Art of the Crate Flip: How Madlib, Kanye, and MF DOOM Turned 70s Soul into Gold',
    subtitle: 'The craft of digging through dusty thrift-store vinyl, finding a 2-second vocal stab, and building timeless anthems.',
    category: 'Sample Lore',
    vibe: 'Golden Era',
    readTime: '7 min read',
    publishedDate: 'September 05, 2026',
    featured: false,
    author: {
      name: 'Jordan Reed',
      role: 'Hip-Hop Archivist & Record Collector',
      avatarInitials: 'JR',
      bio: 'Investigating obscure sample sources and vintage analog gear lineages.'
    },
    coverImage: '/src/assets/images/music_jazz_vinyl_record_1791175513664.jpg',
    imageCaption: 'Fig. 7 — Vintage vinyl turntable spinning 1970s soul record with brass tonearm in moody warm light.',
    excerpt: 'Sampling isn’t stealing; it’s musical time-travel. How chopping up four chords from an obscure 1973 soul record creates modern hip-hop masterpieces.',
    keyTrack: {
      title: 'Accordion',
      artist: 'Madvillain (MF DOOM & Madlib)',
      year: '2004',
      significance: 'Madlib chopping Daedelus accordion loops into 12-bit SP-1200 grit and rolling boom-bap.',
      audioPreset: 'vinyl-sample-chop',
      presetLabel: '12-Bit Chopped Soul Sample & Vinyl Dust',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/14/88/9b/14889b13-1085-8bcf-3749-d75b06bfe824/mzaf_6786610277689339754.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/madvillain%20accordion'
    },
    sections: [
      {
        heading: 'Digging in the Crates',
        paragraphs: [
          'Before streaming algorithms existed, producers spent their weekends inside dusty basement record stores. Madlib famously traveled with portable turntables, buying records simply because the cover art looked weird or because he had never heard of the musicians.',
          'On Madvillainy, his collaboration with the late MF DOOM, Madlib took micro-samples—sometimes only a single snare brush or two accordion chords—and looped them with microscopic precision. The sample became a ghost speaking through the speaker cone.'
        ],
        pullQuote: 'There are no bad records. There are only producers who don’t know where to drop the needle.',
        quoteAttribution: 'MF DOOM'
      },
      {
        heading: 'The 12-Bit Converter Magic',
        paragraphs: [
          'Vintage samplers like the E-mu SP-1200 had limited memory—sometimes only 10 seconds of total sampling time! To fit more music, producers sampled records at 45 RPM and then pitched them down in the machine.',
          'This accidental workflow introduced gritty 12-bit aliasing distortion and punchy low-end presence that modern software plugins still spend thousands of lines of code trying to replicate.'
        ]
      }
    ],
    tags: ['Sampling', 'Madlib', 'MF DOOM', 'Kanye', 'Vinyl'],
    recommendedAlbums: [
      { album: 'Madvillainy', artist: 'Madvillain', year: '2004', label: 'Stones Throw' },
      { album: 'The College Dropout', artist: 'Kanye West', year: '2004', label: 'Roc-A-Fella' },
      { album: 'Endtroducing.....', artist: 'DJ Shadow', year: '1996', label: 'Mo Wax' }
    ]
  },
  {
    id: 'afrobeats-clave-polyrhythms',
    title: 'Why 4/4 Is Boring: The West African Clave Driving Afrobeats and Amapiano',
    subtitle: 'From Burna Boy and Asake to South African log drums: why the syncopated African pulse has conquered global Spotify charts.',
    category: 'Global Rhythms',
    vibe: 'Afro Bounce',
    readTime: '6 min read',
    publishedDate: 'August 28, 2026',
    featured: false,
    author: {
      name: 'Kofi Mensah',
      role: 'African Rhythm Specialist, Lagos',
      avatarInitials: 'KM',
      bio: 'Analyzing West African highlife, Yoruba bell patterns, and the rise of Amapiano.'
    },
    coverImage: '/src/assets/images/afro_percussion_studio_1791176417519.jpg',
    imageCaption: 'Fig. 8 — Handcrafted West African djembe and talking drum in contemporary studio sunlight.',
    excerpt: 'Western pop kept listeners in a rigid 4/4 box for fifty years. Afrobeats and Amapiano took over the world by freeing the hips with interlocking polyrhythms.',
    keyTrack: {
      title: 'Last Last',
      artist: 'Burna Boy',
      year: '2022',
      significance: '3-against-2 African bell matrices combined with deep sub-bass log drums from Johannesburg.',
      audioPreset: 'afrobeats-clave',
      presetLabel: 'Afrobeats Clave Bounce & Log Drum',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/42/c0/0f/42c00f8b-fff6-2529-70c3-861c21143c0a/mzaf_2842108628707526245.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/burna%20boy%20last%20last'
    },
    sections: [
      {
        heading: 'The Death of the Boring Downbeat',
        paragraphs: [
          'In European classical pop, the most important beat is beat one: ONE-two-three-four. Tap your foot, clap your hands, predictable and straight.',
          'In West African rhythmic traditions—which gave birth to modern Afrobeats—beat one is often completely silent. The energy lives in the syncopated iron bell pattern (the clave): 3 hits against 2 pulses. Your body is pulled in two directions at once, creating an irresistible dance reflex.'
        ],
        pullQuote: 'You don’t listen to Afrobeats with your ears; you listen with your waistline and your feet.',
        quoteAttribution: 'Burna Boy'
      },
      {
        heading: 'The Amapiano Log Drum Phenomenon',
        paragraphs: [
          'In South Africa, the rise of Amapiano introduced the world to the "log drum"—a pitch-bending FM percussion bass sound created on fruity loops software that bounces between deep sub-bass and mid-range percussive slaps.',
          'Combined with lush jazz keyboard chords and staggered shaker grooves, African rhythm has permanently reshaped what a global hit sounds like.'
        ]
      }
    ],
    tags: ['Afrobeats', 'Amapiano', 'Burna Boy', 'Asake', 'Polyrhythm'],
    recommendedAlbums: [
      { album: 'Love, Damini', artist: 'Burna Boy', year: '2022', label: 'Atlantic' },
      { album: 'Mr. Money With The Vibe', artist: 'Asake', year: '2022', label: 'YBNL / EMPIRE' },
      { album: 'Rumble in the Jungle', artist: 'Kabza De Small', year: '2021', label: 'Piano Hub' }
    ]
  },
  {
    id: 'analog-warmth-tape-loops',
    title: 'The Warmth of Imperfection: Why Bedroom Producers Are Buying Cassettes & Synths in 2026',
    subtitle: 'In an era of nanosecond-accurate digital music software, why the coolest sound is tape flutter, dust, and pitch drift.',
    category: 'Lofi & Tape',
    vibe: 'Warm Cassette',
    readTime: '6 min read',
    publishedDate: 'August 20, 2026',
    featured: false,
    author: {
      name: 'Elena Rostova',
      role: 'Synthesizer Historian & Sound Designer',
      avatarInitials: 'ER',
      bio: 'Modular synth performer and vintage analog tape archivist.'
    },
    coverImage: '/src/assets/images/music_hero_analog_synth_1791175500146.jpg',
    imageCaption: 'Fig. 9 — Modular analog synthesizer patch cables and illuminated analog meters.',
    excerpt: 'Why Gen Z producers are turning their backs on perfect digital software and spending rent money on 40-year-old tape machines that wobble.',
    keyTrack: {
      title: 'The Disintegration Loops',
      artist: 'William Basinski',
      year: '2002',
      significance: 'Analog tape saturation naturally compresses harsh frequencies and produces unpredictable thermal drift.',
      audioPreset: 'analog-tape-warmth',
      presetLabel: 'Analog Saw Drift & Cassette Wow',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/60/dc/30/60dc30d0-4f41-796b-fea0-e78382af1e7a/mzaf_18394168847888941484.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/william%20basinski%20dlp'
    },
    sections: [
      {
        heading: 'The Sterile Glass of Modern DAWs',
        paragraphs: [
          'If you open Ableton Live or FL Studio today, you have access to a billion-dollar recording studio inside a $600 laptop. Every note can be pitch-corrected to 0.001 cents. Every transient can be aligned to the grid.',
          'And yet, young producers describe digital audio as "glass-like" or "cold." When computers compute sound, there is no friction. There is no physical air. There are no transistors heating up.'
        ],
        pullQuote: 'Tape hiss isn’t noise. It’s the physical sound of the music breathing.',
        quoteAttribution: 'Suzanne Ciani'
      },
      {
        heading: 'Why Thermal Drift Feels Human',
        paragraphs: [
          'In vintage analog synthesizers, the pitch of an oscillator wanders by 3 to 8 cents as the room temperature changes. When two oscillators play together, this slight drift creates a slow, hypnotic chorusing effect called acoustic beating.',
          'Add to that the soft magnetic compression of a cassette tape head—which rounds off harsh high frequencies and glues the bass into the mids—and you get the warm, comforting hug of lo-fi bedroom music.'
        ]
      }
    ],
    tags: ['Lofi', 'Tape Loops', 'Modular Synth', 'Cassettes', 'Analog Gear'],
    recommendedAlbums: [
      { album: 'The Disintegration Loops', artist: 'William Basinski', year: '2002', label: '2062' },
      { album: 'Music for Airports', artist: 'Brian Eno', year: '1978', label: 'Polydor' },
      { album: 'Selected Ambient Works Vol. II', artist: 'Aphex Twin', year: '1994', label: 'Warp' }
    ]
  },
  {
    id: 'mastering-tiktok-loudness-trap',
    title: 'The TikTok Loudness Trap: Why Your Mix Sounds Different on iPhone Speakers vs Headphones',
    subtitle: 'The secret science of LUFS, mono summing, and why crushing your master with limiters destroys your bass.',
    category: 'Production Science',
    vibe: 'Studio Science',
    readTime: '7 min read',
    publishedDate: 'August 14, 2026',
    featured: false,
    author: {
      name: 'Sebastian Haas',
      role: 'Mastering Engineer, Berlin',
      avatarInitials: 'SH',
      bio: 'Mastering records for streaming and mobile-first distribution.'
    },
    coverImage: '/src/assets/images/mastering_studio_desk_1791176429098.jpg',
    imageCaption: 'Fig. 10 — High-end audio mastering control room with analogue equalizers and studio monitors.',
    excerpt: 'You spent 40 hours on your track, and then it sounds like a tin can on TikTok. Here is the actual audio physics behind smartphone mastering.',
    keyTrack: {
      title: 'Starboy (feat. Daft Punk)',
      artist: 'The Weeknd',
      year: '2016',
      significance: 'Mastered with dynamic breathing room so bass frequencies stay punchy across both AirPods and phone speakers.',
      audioPreset: 'tiktok-mastering-test',
      presetLabel: 'Dynamic Master vs Phone Squashed Limiter',
      realAudioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/71/d6/1171d6ad-3c96-e027-2af6-58028426588c/mzaf_15137631797407745471.plus.aac.p.m4a',
      spotifyUrl: 'https://open.spotify.com/search/the%20weeknd%20starboy'
    },
    sections: [
      {
        heading: 'The iPhone Speaker Trap',
        paragraphs: [
          'Over 70% of music discovered by Gen Z today is first heard through iPhone speakers or TikTok audio clips. But a smartphone speaker has a tiny micro-transducer that cannot physically reproduce any frequency below 200 Hz!',
          'If your 808 sub-bass only lives at 45 Hz, it literally vanishes on a phone. The secret weapon used by top mixers like Serban Ghenea is "harmonic saturation"—adding subtle distortion to generate second and third harmonics in the 300 to 700 Hz range so your brain reconstructs the missing bass note.'
        ],
        pullQuote: 'A mix that sounds loud because it is crushed sounds tiny on a phone. A dynamic mix with punchy transients sounds enormous everywhere.',
        quoteAttribution: 'Bob Katz, Mastering Guru'
      },
      {
        heading: 'Why Streaming Normalization Ended the Loudness Wars',
        paragraphs: [
          'Spotify, Apple Music, and YouTube all use automatic loudness normalization targeting -14 LUFS. If you smash your song into a brickwall limiter at -6 LUFS, Spotify simply turns your track down by 8 dB.',
          'The result? Your track now sounds quieter, flatter, and weaker than a dynamic master that was left to breathe with punchy drum transients.'
        ],
        listeningNotes: [
          'Listen to how an over-compressed kick loses its punch and becomes a dull, flat thud.',
          'Notice how stereo widening tricks cancel out when summed to mono on a phone speaker.',
          'Hear the difference when transient headroom allows the snare to cut through.'
        ]
      }
    ],
    tags: ['Mastering', 'TikTok Audio', 'Production', 'LUFS', 'iPhone Speakers'],
    recommendedAlbums: [
      { album: 'Random Access Memories', artist: 'Daft Punk', year: '2013', label: 'Columbia' },
      { album: 'After Hours', artist: 'The Weeknd', year: '2020', label: 'XO / Republic' },
      { album: 'Mezzanine', artist: 'Massive Attack', year: '1998', label: 'Virgin' }
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Shoegaze & Alt-Rock',
  'Breakbeats & Jungle',
  'Hip-Hop & R&B',
  'Internet Aesthetics',
  'Ambient & Study',
  'Bass & Trap',
  'Sample Lore',
  'Global Rhythms',
  'Lofi & Tape',
  'Production Science'
] as const;
