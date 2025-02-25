# Generated by Django 5.0.4 on 2024-05-19 10:40

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('video_system', '0002_video_movement_type_alter_video_caption_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MovementCriteria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movement_type', models.CharField(choices=[('run', 'Run'), ('gallop', 'Gallop'), ('hop', 'Hop'), ('leap', 'Leap'), ('horizontal_jump', 'Horizontal Jump'), ('slide', 'Slide'), ('skip', 'Skip')], max_length=20)),
                ('criteria', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Trial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_trial', models.BooleanField(default=False)),
                ('second_trial', models.BooleanField(default=False)),
                ('assessment_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('criteria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trials', to='assessment_system.movementcriteria')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trials', to='video_system.video')),
            ],
        ),
    ]
