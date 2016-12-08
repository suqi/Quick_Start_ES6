PUBLISHDIR      = doc_src
IPYNBDIR        = ipynbs


run: build publish
	@echo “ok”

.PHONY: build
build: 
	if [ -d $(PUBLISHDIR) ];then echo “$(PUBLISHDIR) exist”;else mkdir $(PUBLISHDIR);fi

.PHONY: publish
publish:	
	$(shell cd $(IPYNBDIR);jupyter nbconvert --to rst *.ipynb)
	$(shell cd $(IPYNBDIR);find . -type f -maxdepth 1 -regex ".*\.\(rst\)" -exec mv {} ../$(PUBLISHDIR) \;)
	cp -r $(IPYNBDIR)/img $(PUBLISHDIR)/
	@echo
	@echo "Build finished. The rst pages are in $(PUBLISHDIR)."
