# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Venue'
        db.create_table('venues_venue', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=1023)),
            ('latitude', self.gf('django.db.models.fields.FloatField')()),
            ('longitude', self.gf('django.db.models.fields.FloatField')()),
            ('checkinsCount', self.gf('django.db.models.fields.IntegerField')()),
            ('city', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='venues', null=True, to=orm['props.City'])),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='venues', null=True, to=orm['categories.Category'])),
        ))
        db.send_create_signal('venues', ['Venue'])


    def backwards(self, orm):
        # Deleting model 'Venue'
        db.delete_table('venues_venue')


    models = {
        'categories.category': {
            'Meta': {'object_name': 'Category'},
            'dataSource': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['props.DataSource']", 'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '512', 'primary_key': 'True'}),
            'parentCat': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'children_categories'", 'null': 'True', 'to': "orm['categories.Category']"})
        },
        'props.city': {
            'Meta': {'object_name': 'City'},
            'country': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'long': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        'props.datasource': {
            'Meta': {'object_name': 'DataSource'},
            'hits': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ref': ('django.db.models.fields.CharField', [], {'max_length': '1000'})
        },
        'venues.venue': {
            'Meta': {'object_name': 'Venue'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'venues'", 'null': 'True', 'to': "orm['categories.Category']"}),
            'checkinsCount': ('django.db.models.fields.IntegerField', [], {}),
            'city': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'venues'", 'null': 'True', 'to': "orm['props.City']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('django.db.models.fields.FloatField', [], {}),
            'longitude': ('django.db.models.fields.FloatField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '1023'})
        }
    }

    complete_apps = ['venues']