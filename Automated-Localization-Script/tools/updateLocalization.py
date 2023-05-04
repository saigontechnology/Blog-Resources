#! /usr/bin/python

import gspread
import sys

col = sys.argv[1]
gc = gspread.service_account()
sh = gc.open_by_url('https://docs.google.com/spreadsheets/d/1Lpo2sLFNaDXfLgEbR4WipWEM3R8C6mc4zsbaMcvxfMY')
worksheet = sh.get_worksheet(0)
cell = worksheet.find("gspreadIOS")
val = worksheet.get(col + str(cell.row)).first()

print(val)