from django.db import models
from client_system.models import Client
from django.utils import timezone
from video_system.models import Video  # Assuming 'video_app' is the name of the app where the Video model is defined.

class Criterion(models.Model):
    MOVEMENT_TYPES = [
        ('run', 'Run'),
        ('gallop', 'Gallop'),
        ('hop', 'Hop'),
        ('leap', 'Leap'),
        ('horizontal_jump', 'Horizontal Jump'),
        ('slide', 'Slide'),
        ('skip', 'Skip'),
    ]

    description = models.CharField(max_length=255)
    movement_type = models.CharField(max_length=20, choices=MOVEMENT_TYPES)

    def __str__(self):
        return f"{self.get_movement_type_display()}: {self.description}"

class Trial(models.Model):
    TRIAL_CHOICES = [
        ('first_trial', 'First Trial'),
        ('second_trial', 'Second Trial'),
    ]

    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    trial_type = models.CharField(max_length=20, choices=TRIAL_CHOICES)
    date_conducted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.video.caption} - {self.get_trial_type_display()}"

class Assessment(models.Model):
    criterion = models.ForeignKey(Criterion, on_delete=models.CASCADE)
    trial = models.ForeignKey(Trial, on_delete=models.CASCADE)
    is_met = models.BooleanField()

    def __str__(self):
        return f"Assessment for {self.criterion}: {'Met' if self.is_met else 'Not Met'}"
