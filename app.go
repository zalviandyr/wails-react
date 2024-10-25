package main

import (
	"context"
	"fmt"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

type Note struct {
	gorm.Model
	Text string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	// Init Database
	dbPath := os.TempDir() + "wails-react-note.db"
	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	db.AutoMigrate(&Note{})

	if err != nil {
		panic(err)
	}

	a.ctx = ctx
	a.db = db
}

func (a *App) Print(data any) {
	fmt.Println(data)
}

func (a *App) CreateNote(text string) Note {
	note := Note{Text: text}

	a.db.Create(&note)
	return note
}

func (a *App) GetNotes() []Note {
	var notes []Note

	a.db.Find(&notes)
	return notes
}

func (a *App) DeleteNote(id uint) {
	a.db.Delete(&Note{}, id)
}
