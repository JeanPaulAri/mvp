from core.models import AudioType

def seed_audio_types():
    """Crear los tipos de audio por defecto"""
    audio_types = [
        {
            'name': 'bgm',
            'icon': '🎵',
            'description': 'Música de fondo para proyectos, videos y aplicaciones'
        },
        {
            'name': 'sfx',
            'icon': '🔊',
            'description': 'Efectos de sonido para películas, juegos y animaciones'
        },
        {
            'name': 'music',
            'icon': '🎶',
            'description': 'Música original e independiente de diferentes géneros'
        },
        {
            'name': 'ost',
            'icon': '🎼',
            'description': 'Bandas sonoras originales de películas, series y videojuegos'
        },
        {
            'name': 'compilation',
            'icon': '📦',
            'description': 'Packs de múltiples audios a precio especial'
        },
    ]
    
    for audio_type_data in audio_types:
        audio_type, created = AudioType.objects.get_or_create(
            name=audio_type_data['name'],
            defaults={
                'icon': audio_type_data['icon'],
                'description': audio_type_data['description']
            }
        )
        if created:
            print(f"✅ Creado tipo de audio: {audio_type_data['name']}")
        else:
            print(f"⏭️ Tipo de audio {audio_type_data['name']} ya existe")

if __name__ == '__main__':
    seed_audio_types()
