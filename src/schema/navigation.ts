import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'navigation',
    title: 'Navigation (Singleton)',
    type: 'document',
    icon: () => '🧭',
    groups: [
        { name: 'megaMenu', title: 'Mega Menu' },
        { name: 'topLinks', title: 'Top-Level Links' },
        { name: 'featured', title: 'Featured Box' },
    ],
    fields: [
        // ── Mega Menu Columns ──
        defineField({
            name: 'megaMenuColumns',
            title: 'Mega Menu – Spalten',
            type: 'array',
            group: 'megaMenu',
            description: 'Jede Spalte enthält eine Kategorie-Überschrift und darunter die Produkt-Links.',
            of: [
                {
                    type: 'object',
                    name: 'menuColumn',
                    title: 'Spalte',
                    fields: [
                        defineField({
                            name: 'columnTitle',
                            title: 'Spalten-Überschrift',
                            type: 'string',
                            description: 'z.B. "Reichweite & Sichtbarkeit"',
                        }),
                        defineField({
                            name: 'items',
                            title: 'Menu Items',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'menuItem',
                                    title: 'Menu Item',
                                    fields: [
                                        { name: 'label', title: 'Label', type: 'string' },
                                        { name: 'description', title: 'Kurzbeschreibung', type: 'string' },
                                        { name: 'href', title: 'Link URL', type: 'string' },
                                        {
                                            name: 'iconColor',
                                            title: 'Icon-Farbe',
                                            type: 'string',
                                            options: {
                                                list: [
                                                    { title: 'Orange (Brand)', value: 'brand' },
                                                    { title: 'Grün', value: 'emerald' },
                                                    { title: 'Violett', value: 'violet' },
                                                    { title: 'Blau', value: 'sky' },
                                                    { title: 'Pink', value: 'pink' },
                                                    { title: 'Gelb', value: 'amber' },
                                                ],
                                            },
                                            initialValue: 'brand',
                                        },
                                        {
                                            name: 'iconName',
                                            title: 'Icon',
                                            type: 'string',
                                            description: 'Name des Icons: arrow, search, video, chat, image, settings, zap, globe, shield, star',
                                            options: {
                                                list: [
                                                    { title: '→ Pfeil (Arrow)', value: 'arrow' },
                                                    { title: '🔍 Suche (Search)', value: 'search' },
                                                    { title: '🎬 Video', value: 'video' },
                                                    { title: '💬 Chat', value: 'chat' },
                                                    { title: '🖼 Bild (Image)', value: 'image' },
                                                    { title: '⚙️ Einstellungen', value: 'settings' },
                                                    { title: '⚡ Blitz (Zap)', value: 'zap' },
                                                    { title: '🌐 Globe', value: 'globe' },
                                                    { title: '🛡 Shield', value: 'shield' },
                                                    { title: '⭐ Star', value: 'star' },
                                                ],
                                            },
                                            initialValue: 'arrow',
                                        },
                                    ],
                                    preview: {
                                        select: { title: 'label', subtitle: 'description' },
                                    },
                                },
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'columnTitle' },
                    },
                },
            ],
        }),

        // ── Top-Level Links ──
        defineField({
            name: 'topLinks',
            title: 'Top-Level Navigation Links',
            type: 'array',
            group: 'topLinks',
            description: 'Die flachen Links neben dem Mega-Menu (z.B. Branchen, Preise, Magazin).',
            of: [
                {
                    type: 'object',
                    name: 'topLink',
                    title: 'Link',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'href', title: 'Link URL', type: 'string' },
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'href' },
                    },
                },
            ],
        }),

        // ── Featured Box (right column of mega menu) ──
        defineField({
            name: 'featuredTitle',
            title: 'Featured – Überschrift',
            type: 'string',
            group: 'featured',
        }),
        defineField({
            name: 'featuredText',
            title: 'Featured – Beschreibung',
            type: 'text',
            rows: 3,
            group: 'featured',
        }),
        defineField({
            name: 'featuredButtonText',
            title: 'Featured – Button Text',
            type: 'string',
            group: 'featured',
            initialValue: 'Jetzt beraten lassen',
        }),
        defineField({
            name: 'featuredButtonUrl',
            title: 'Featured – Button URL',
            type: 'string',
            group: 'featured',
            initialValue: '/kontakt',
        }),
        defineField({
            name: 'featuredLabel',
            title: 'Featured – Oberes Label',
            type: 'string',
            group: 'featured',
            initialValue: 'Highlight',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured – Bild',
            type: 'image',
            group: 'featured',
            options: { hotspot: true },
            description: 'Optionales Bild für die Highlight-Box im Mega Menu.',
        }),

        // ── CTA Button ──
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            type: 'string',
            initialValue: 'Kontakt aufnehmen',
        }),
        defineField({
            name: 'ctaUrl',
            title: 'CTA Button URL',
            type: 'string',
            initialValue: '/kontakt',
        }),
    ],
})
