# Generated by Django 2.1.10 on 2020-09-02 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('article_id', models.CharField(max_length=100, verbose_name='文章id')),
                ('article_name', models.CharField(max_length=100, verbose_name='文章标题')),
                ('summary', models.CharField(max_length=200, null=True, verbose_name='文章摘要')),
                ('author', models.CharField(max_length=50, verbose_name='作者')),
                ('content', models.TextField(verbose_name='文章详情内容')),
                ('image_url', models.CharField(max_length=500, null=True, verbose_name='图片链接')),
            ],
            options={
                'verbose_name': '商品SKU',
                'verbose_name_plural': '商品SKU',
                'db_table': 'article_detail',
            },
        ),
        migrations.CreateModel(
            name='ArticleList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('article_id', models.CharField(max_length=100, verbose_name='文章id')),
                ('article_name', models.CharField(max_length=100, verbose_name='文章标题')),
                ('summary', models.CharField(max_length=200, null=True, verbose_name='文章摘要')),
                ('author', models.CharField(max_length=50, verbose_name='作者')),
            ],
            options={
                'verbose_name': '商品SKU',
                'verbose_name_plural': '商品SKU',
                'db_table': 'article_list',
            },
        ),
    ]
