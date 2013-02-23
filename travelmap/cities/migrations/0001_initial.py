# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'City'
        db.create_table('cities_city', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('country', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('long', self.gf('django.db.models.fields.FloatField')()),
            ('lat', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal('cities', ['City'])

        # Adding model 'Hotel'
        db.create_table('cities_hotel', (
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200, primary_key=True)),
            ('city', self.gf('django.db.models.fields.related.ForeignKey')(related_name='hotel_in', to=orm['cities.City'])),
            ('rate', self.gf('django.db.models.fields.IntegerField')()),
            ('stars', self.gf('django.db.models.fields.FloatField')()),
            ('long', self.gf('django.db.models.fields.FloatField')()),
            ('lat', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal('cities', ['Hotel'])

        # Adding model 'Flight'
        db.create_table('cities_flight', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('country', self.gf('django.db.models.fields.related.ForeignKey')(related_name='destination', to=orm['cities.City'])),
            ('cost', self.gf('django.db.models.fields.FloatField')()),
            ('distance', self.gf('django.db.models.fields.FloatField')()),
        ))
        db.send_create_signal('cities', ['Flight'])


    def backwards(self, orm):
        # Deleting model 'City'
        db.delete_table('cities_city')

        # Deleting model 'Hotel'
        db.delete_table('cities_hotel')

        # Deleting model 'Flight'
        db.delete_table('cities_flight')


    models = {
        'cities.city': {
            'Meta': {'object_name': 'City'},
            'country': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'long': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'cities.flight': {
            'Meta': {'object_name': 'Flight'},
            'cost': ('django.db.models.fields.FloatField', [], {}),
            'country': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'destination'", 'to': "orm['cities.City']"}),
            'distance': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'cities.hotel': {
            'Meta': {'object_name': 'Hotel'},
            'city': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'hotel_in'", 'to': "orm['cities.City']"}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'long': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200', 'primary_key': 'True'}),
            'rate': ('django.db.models.fields.IntegerField', [], {}),
            'stars': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['cities']