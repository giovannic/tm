# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'ExtUrl'
        db.create_table('cities_exturl', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('ref', self.gf('django.db.models.fields.CharField')(max_length=1000, null=True)),
            ('hits', self.gf('django.db.models.fields.IntegerField')(default=0)),
        ))
        db.send_create_signal('cities', ['ExtUrl'])

        # Adding field 'Hotel.source'
        db.add_column('cities_hotel', 'source',
                      self.gf('django.db.models.fields.related.ForeignKey')(related_name='hotel_source', null=True, to=orm['cities.ExtUrl']),
                      keep_default=False)

        # Adding field 'Flight.source'
        db.add_column('cities_flight', 'source',
                      self.gf('django.db.models.fields.related.ForeignKey')(related_name='flight_source', null=True, to=orm['cities.ExtUrl']),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting model 'ExtUrl'
        db.delete_table('cities_exturl')

        # Deleting field 'Hotel.source'
        db.delete_column('cities_hotel', 'source_id')

        # Deleting field 'Flight.source'
        db.delete_column('cities_flight', 'source_id')


    models = {
        'cities.city': {
            'Meta': {'object_name': 'City'},
            'country': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'long': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'cities.exturl': {
            'Meta': {'object_name': 'ExtUrl'},
            'hits': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ref': ('django.db.models.fields.CharField', [], {'max_length': '1000', 'null': 'True'})
        },
        'cities.flight': {
            'Meta': {'object_name': 'Flight'},
            'cost': ('django.db.models.fields.FloatField', [], {}),
            'country': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'destination'", 'to': "orm['cities.City']"}),
            'distance': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'source': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'flight_source'", 'null': 'True', 'to': "orm['cities.ExtUrl']"})
        },
        'cities.hotel': {
            'Meta': {'object_name': 'Hotel'},
            'city': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'hotel_in'", 'to': "orm['cities.City']"}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'long': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200', 'primary_key': 'True'}),
            'rate': ('django.db.models.fields.IntegerField', [], {}),
            'source': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'hotel_source'", 'null': 'True', 'to': "orm['cities.ExtUrl']"}),
            'stars': ('django.db.models.fields.FloatField', [], {})
        }
    }

    complete_apps = ['cities']