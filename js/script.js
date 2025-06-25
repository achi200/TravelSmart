        // Global variables
        var currentUserRole = 'admin';
        var currentOfferData = {};
        
        var countries = [
            'Австрия', 'Австралия', 'Белгия', 'България', 'Великобритания', 'Германия', 'Гърция', 
            'Дания', 'Египет', 'Испания', 'Италия', 'Кипър', 'Малта', 'Нидерландия', 'Норвегия',
            'Полша', 'Португалия', 'Румъния', 'САЩ', 'Тайланд', 'Турция', 'Франция', 'Хърватия',
            'Чехия', 'Швейцария', 'Швеция'
        ];

        var insuranceCompanies = [
            { name: 'Euroins', logo: '🛡️', color: '#e74c3c' },
            { name: 'Allianz', logo: '🔷', color: '#3498db' },
            { name: 'Uniqa', logo: '🟦', color: '#9b59b6' },
            { name: 'Lev Ins', logo: '🦁', color: '#f39c12' },
            { name: 'Bulstrad', logo: '⭐', color: '#27ae60' }
        ];

        var offers = [
            {
                id: 'OF-2025-001',
                client: 'Иван Петров',
                destination: 'Мадрид, Испания',
                dates: '15.07.2025 - 25.07.2025',
                premium: '125 лв.',
                company: 'Euroins',
                travelersCount: 2,
                status: 'offer'
            },
            {
                id: 'OF-2025-002',
                client: 'Мария Георгиева',
                destination: 'Рим, Италия',
                dates: '01.08.2025 - 14.08.2025',
                premium: '185 лв.',
                company: 'Allianz',
                travelersCount: 1,
                status: 'offer'
            }
        ];

        var policies = [
            {
                id: 'TG-2025-001',
                client: 'Георги Димитров',
                destination: 'Париж, Франция',
                dates: '10.09.2025 - 20.09.2025',
                premium: '155 лв.',
                company: 'Uniqa',
                status: 'active'
            }
        ];

        // Core functions
        function showScreen(screenId) {
            var screens = document.querySelectorAll('.screen');
            for (var i = 0; i < screens.length; i++) {
                screens[i].classList.remove('active');
            }
            document.getElementById(screenId).classList.add('active');
        }

        function showDashboardTab(tabId) {
            var tabs = document.querySelectorAll('.dashboard-tab');
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].style.display = 'none';
            }
            
            var links = document.querySelectorAll('.navbar a');
            for (var i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
            
            document.getElementById(tabId + 'NavLink').classList.add('active');
            document.getElementById(tabId + 'Tab').style.display = 'block';
        }

        function showModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
        }

        function hideModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Custom popup functions
        function showCustomPopup(title, message, onConfirm, onCancel) {
            document.getElementById('popupTitle').textContent = title;
            document.getElementById('popupMessage').textContent = message;
            
            var popup = document.getElementById('customPopup');
            var confirmBtn = document.getElementById('popupConfirm');
            var cancelBtn = document.getElementById('popupCancel');
            
            confirmBtn.onclick = null;
            cancelBtn.onclick = null;
            
            confirmBtn.onclick = function() {
                hideCustomPopup();
                if (onConfirm) onConfirm();
            };
            
            if (onCancel) {
                cancelBtn.style.display = 'inline-block';
                cancelBtn.onclick = function() {
                    hideCustomPopup();
                    onCancel();
                };
            } else {
                cancelBtn.style.display = 'none';
            }
            
            popup.classList.add('show');
        }

        function hideCustomPopup() {
            document.getElementById('customPopup').classList.remove('show');
        }

        function showAlert(title, message) {
            showCustomPopup(title, message, null, null);
        }

        function showConfirm(title, message, onConfirm, onCancel) {
            showCustomPopup(title, message, onConfirm, onCancel);
        }

        // Country dropdown functions
        function showCountryDropdown() {
            var dropdown = document.getElementById('countryDropdown');
            dropdown.style.display = 'block';
            populateCountries();
        }

        function populateCountries(filter) {
            filter = filter || '';
            var dropdown = document.getElementById('countryDropdown');
            var filteredCountries = [];
            
            for (var i = 0; i < countries.length; i++) {
                if (countries[i].toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                    filteredCountries.push(countries[i]);
                }
            }

            var html = '';
            for (var i = 0; i < filteredCountries.length; i++) {
                html += '<div class="country-option" onclick="selectCountry(\'' + filteredCountries[i] + '\')">' + filteredCountries[i] + '</div>';
            }
            dropdown.innerHTML = html;
        }

        function filterCountries() {
            var input = document.getElementById('travelDestination');
            populateCountries(input.value);
        }

        function selectCountry(country) {
            document.getElementById('travelDestination').value = country;
            document.getElementById('countryDropdown').style.display = 'none';
        }

        // Traveler functions
        function addTraveler() {
            var container = document.getElementById('travelersContainer');
            var count = container.children.length + 1;
            var travelerDiv = document.createElement('div');
            travelerDiv.className = 'traveler-entry';
            travelerDiv.innerHTML = '<div class="traveler-number">' + count + '</div><div style="flex: 1;"><label style="display: block; margin-bottom: 5px; font-size: 14px; color: #666;">Възраст</label><input type="number" class="form-control" placeholder="Възраст" min="0" max="120" onchange="updateTravelersCount()"></div>';
            container.appendChild(travelerDiv);
            updateTravelersCount();
            updateTravelerButtons();
        }

        function removeLastTraveler() {
            var container = document.getElementById('travelersContainer');
            if (container.children.length > 1) {
                container.removeChild(container.lastElementChild);
                updateTravelersCount();
                updateTravelerButtons();
            }
        }

        function updateTravelerButtons() {
            var container = document.getElementById('travelersContainer');
            var removeBtn = document.getElementById('removeLastBtn');
            
            if (container.children.length > 1) {
                removeBtn.style.display = 'inline-block';
            } else {
                removeBtn.style.display = 'none';
            }
        }

        function updateTravelersCount() {
            var container = document.getElementById('travelersContainer');
            var count = container.children.length;
            document.getElementById('travelersCount').textContent = count;
        }

        // Offer creation functions
        function proceedToOffers() {
            var destination = document.getElementById('travelDestination').value;
            var purpose = document.getElementById('travelPurpose').value;
            var amount = document.getElementById('insuranceAmount').value;
            var departureDate = document.getElementById('departureDate').value;
            var returnDate = document.getElementById('returnDate').value;
            var ageInputs = document.querySelectorAll('#travelersContainer input[type="number"]');
            
            if (!destination || !purpose || !amount || !departureDate || !returnDate) {
                showAlert('Грешка', 'Моля попълнете всички полета!');
                return;
            }

            if (new Date(returnDate) <= new Date(departureDate)) {
                showAlert('Грешка', 'Датата на завръщане трябва да е след датата на заминаване!');
                return;
            }

            var ages = [];
            for (var i = 0; i < ageInputs.length; i++) {
                if (ageInputs[i].value) {
                    ages.push(ageInputs[i].value);
                }
            }
            
            if (ages.length !== ageInputs.length) {
                showAlert('Грешка', 'Моля въведете възрастта на всички пътуващи!');
                return;
            }

            currentOfferData = {
                destination: destination,
                purpose: purpose,
                amount: amount,
                departureDate: departureDate,
                returnDate: returnDate,
                ages: ages,
                travelersCount: ages.length
            };

            updateOfferSummary();
            generateInsuranceOffers();
            showScreen('selectOffersScreen');
        }

        function updateOfferSummary() {
            var purposeMap = {
                'business': 'Бизнес',
                'leisure': 'Туризъм/Почивка',
                'study': 'Образование/Учеба',
                'medical': 'Медицинско лечение',
                'family': 'Посещение на семейство',
                'sports': 'Спортни дейности'
            };

            document.getElementById('summaryDestination').textContent = currentOfferData.destination;
            document.getElementById('summaryPurpose').textContent = purposeMap[currentOfferData.purpose];
            document.getElementById('summaryAmount').textContent = new Intl.NumberFormat('bg-BG').format(currentOfferData.amount) + ' евро';
            document.getElementById('summaryDates').textContent = currentOfferData.departureDate + ' - ' + currentOfferData.returnDate;
            document.getElementById('summaryTravelers').textContent = currentOfferData.travelersCount + ' (' + currentOfferData.ages.join(', ') + ' г.)';
        }

        function generateInsuranceOffers() {
            var container = document.getElementById('insuranceOffersContainer');
            var basePrice = calculateBasePrice();
            
            var html = '';
            for (var i = 0; i < insuranceCompanies.length; i++) {
                var company = insuranceCompanies[i];
                var price = Math.round(basePrice * (0.8 + Math.random() * 0.4));
                var features = getCompanyFeatures(company.name);
                var details = getCompanyDetails(company.name);
                
                html += '<div class="insurance-offer-card" onclick="selectInsuranceOffer(\'' + company.name + '\', ' + price + ')">';
                html += '<div class="company-header">';
                html += '<div class="company-info">';
                html += '<div class="company-logo" style="background: ' + company.color + '20;">';
                html += '<span style="font-size: 32px;">' + company.logo + '</span>';
                html += '</div>';
                html += '<div>';
                html += '<h4 style="margin: 0; color: ' + company.color + '; font-size: 20px;">' + company.name + '</h4>';
                html += '<p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">' + details.description + '</p>';
                html += '</div>';
                html += '</div>';
                html += '<div class="price-info">';
                html += '<div class="price-main" style="color: ' + company.color + ';">' + price + ' лв.</div>';
                html += '<div class="price-subtitle">за цялото пътуване</div>';
                html += '</div>';
                html += '</div>';
                
                html += '<div class="company-details">';
                html += '<h5 style="margin-bottom: 15px; color: #2c3e50;">Подробности за покритието</h5>';
                html += '<div class="details-grid">';
                html += '<div class="detail-item"><span class="detail-label">Рейтинг:</span><span class="detail-value">' + details.rating + '/10</span></div>';
                html += '<div class="detail-item"><span class="detail-label">Обработка на щети:</span><span class="detail-value">' + details.claimProcessing + '</span></div>';
                html += '<div class="detail-item"><span class="detail-label">Телефон:</span><span class="detail-value">' + details.phone + '</span></div>';
                html += '<div class="detail-item"><span class="detail-label">Покритие COVID-19:</span><span class="detail-value">' + details.covidCoverage + '</span></div>';
                html += '</div>';
                html += '</div>';

                html += '<div class="features-grid">';
                for (var j = 0; j < features.length; j++) {
                    html += '<div class="feature-item">';
                    html += '<span style="color: #4CAF50; font-weight: bold;">✓</span>';
                    html += '<span>' + features[j] + '</span>';
                    html += '</div>';
                }
                html += '</div>';

                html += '<div class="company-actions">';
                html += '<button class="btn" style="background: ' + company.color + '; padding: 12px 30px;">Избери тази оферта</button>';
                html += '<a href="#" class="more-info-link" onclick="event.stopPropagation(); showCompanyInfo(\'' + company.name + '\')">Повече информация →</a>';
                html += '</div>';
                html += '</div>';
            }
            
            container.innerHTML = html;
        }

        function calculateBasePrice() {
            var amount = parseInt(currentOfferData.amount);
            var travelersCount = currentOfferData.travelersCount;
            var totalAge = 0;
            
            for (var i = 0; i < currentOfferData.ages.length; i++) {
                totalAge += parseInt(currentOfferData.ages[i]);
            }
            var avgAge = totalAge / currentOfferData.ages.length;
            
            var basePrice = amount * 0.002;
            basePrice *= travelersCount;
            
            if (avgAge > 65) basePrice *= 1.5;
            else if (avgAge > 45) basePrice *= 1.2;
            
            return Math.round(basePrice);
        }

        function getCompanyFeatures(companyName) {
            var features = {
                'Euroins': ['Медицински разходи до лимита', '24/7 асистентска линия', 'Покритие за багаж до 1000€', 'Отмяна на пътуване', 'Забавяне на полет', 'Спешна стоматология'],
                'Allianz': ['Световно покритие', 'Спортни дейности', 'Разширено медицинско покритие', 'Бърза обработка на щети', 'Телемедицина', 'Покритие за бременност'],
                'Uniqa': ['Гъвкави условия', 'Онлайн управление', 'Семейни отстъпки', 'Покритие за COVID-19', 'Хронични заболявания', 'Психологическа помощ'],
                'Lev Ins': ['Конкурентни цени', 'Бърза обработка', 'Местна поддръжка на български', 'Опростена процедура', 'Онлайн подаване на щети', 'Без франшиза'],
                'Bulstrad': ['Традиционен застраховател', 'Широка мрежа партньори', 'Надеждно покритие', 'Дългогодишен опит', 'Покритие за възрастни', 'Специални условия за деца']
            };
            return features[companyName] || [];
        }

        function getCompanyDetails(companyName) {
            var details = {
                'Euroins': {
                    description: 'Водещ застраховател в България',
                    rating: '8.5',
                    claimProcessing: '24-48 часа',
                    phone: '+359 700 11 011',
                    covidCoverage: 'Да'
                },
                'Allianz': {
                    description: 'Международен лидер в застраховането',
                    rating: '9.2',
                    claimProcessing: '12-24 часа',
                    phone: '+359 2 8166 166',
                    covidCoverage: 'Да'
                },
                'Uniqa': {
                    description: 'Австрийска застрахователна група',
                    rating: '8.8',
                    claimProcessing: '24-36 часа',
                    phone: '+359 2 8165 555',
                    covidCoverage: 'Да'
                },
                'Lev Ins': {
                    description: 'Български застраховател с добри цени',
                    rating: '7.9',
                    claimProcessing: '48-72 часа',
                    phone: '+359 2 9700 700',
                    covidCoverage: 'Частично'
                },
                'Bulstrad': {
                    description: 'Най-старият застраховател в България',
                    rating: '8.1',
                    claimProcessing: '36-48 часа',
                    phone: '+359 2 8166 100',
                    covidCoverage: 'Да'
                }
            };
            return details[companyName] || {};
        }

        function showCompanyInfo(companyName) {
            var details = getCompanyDetails(companyName);
            var features = getCompanyFeatures(companyName);
            
            var message = details.description + '\n\nРейтинг: ' + details.rating + '/10\n';
            message += 'Телефон: ' + details.phone + '\n';
            message += 'Обработка на щети: ' + details.claimProcessing + '\n\n';
            message += 'Основни покрития:\n• ' + features.join('\n• ');
            
            showAlert('Информация за ' + companyName, message);
        }

        function selectInsuranceOffer(companyName, price) {
            showConfirm('Потвърдете избора', 
                'Сигурни ли сте, че искате да изберете офертата от ' + companyName + ' за ' + price + ' лв.?',
                function() { createOfferWithCompany(companyName, price); },
                null
            );
        }

        function createOfferWithCompany(companyName, price) {
            var newOfferNumber = 'OF-2025-' + String(offers.length + 1).padStart(3, '0');
            var newOffer = {
                id: newOfferNumber,
                client: 'Нов клиент',
                destination: currentOfferData.destination,
                dates: currentOfferData.departureDate + ' - ' + currentOfferData.returnDate,
                premium: price + ' лв.',
                company: companyName,
                travelersCount: currentOfferData.travelersCount,
                status: 'offer'
            };

            offers.push(newOffer);
            updateOffersTable();

            showAlert('Успешно', 'Офертата беше създадена успешно!\nНомер: ' + newOfferNumber + '\nЗастраховател: ' + companyName + '\nЦена: ' + price + ' лв.');
            
            currentOfferData = {};
            showScreen('dashboardScreen');
            showDashboardTab('offers');
        }

        function updateOffersTable() {
            var tbody = document.getElementById('offersTableBody');
            tbody.innerHTML = '';

            for (var i = 0; i < offers.length; i++) {
                var offer = offers[i];
                var row = tbody.insertRow();
                row.innerHTML = '<td>' + offer.id + '</td>' +
                               '<td>' + offer.client + '</td>' +
                               '<td>' + offer.destination + '</td>' +
                               '<td>' + offer.dates + '</td>' +
                               '<td>' + offer.premium + '</td>' +
                               '<td><span class="badge badge-info">' + offer.company + '</span></td>' +
                               '<td><span class="badge badge-warning">Оферта</span></td>' +
                               '<td>' +
                               '<button class="btn btn-secondary" onclick="editOffer(\'' + offer.id + '\')">Редактирай</button>' +
                               '<button class="btn btn-primary" onclick="createPolicyFromOffer(\'' + offer.id + '\')">Издаване на полица</button>' +
                               '<button class="btn" onclick="viewOffer(\'' + offer.id + '\')">Преглед</button>' +
                               '</td>';
            }
        }

        function editOffer(offerId) {
            showAlert('Функция', 'Редактиране на оферта: ' + offerId);
        }

        function viewOffer(offerId) {
            showAlert('Функция', 'Преглед на оферта: ' + offerId);
        }

        // Policy creation from offers
        function createPolicyFromOffer(offerId) {
            var offer = null;
            for (var i = 0; i < offers.length; i++) {
                if (offers[i].id === offerId) {
                    offer = offers[i];
                    break;
                }
            }
            
            if (!offer) {
                showAlert('Грешка', 'Офертата не е намерена!');
                return;
            }

            // Populate offer details in modal
            document.getElementById('offerNumber').textContent = offerId;
            
            var detailsHtml = '';
            detailsHtml += '<div><strong>Клиент:</strong><br>' + offer.client + '</div>';
            detailsHtml += '<div><strong>Дестинация:</strong><br>' + offer.destination + '</div>';
            detailsHtml += '<div><strong>Дати:</strong><br>' + offer.dates + '</div>';
            detailsHtml += '<div><strong>Премия:</strong><br>' + offer.premium + '</div>';
            detailsHtml += '<div><strong>Застраховател:</strong><br>' + offer.company + '</div>';
            detailsHtml += '<div><strong>Пътуващи:</strong><br>' + offer.travelersCount + ' души</div>';
            
            document.getElementById('offerDetails').innerHTML = detailsHtml;
            
            // Pre-fill client name if it's not "Нов клиент"
            if (offer.client !== 'Нов клиент') {
                document.getElementById('clientName').value = offer.client;
            } else {
                document.getElementById('clientName').value = '';
            }
            
            // Clear other fields
            document.getElementById('clientPhone').value = '';
            document.getElementById('clientEmail').value = '';
            document.getElementById('clientAddress').value = '';

            showModal('createPolicyModal');
        }

        function finalizePolicy() {
            var offerId = document.getElementById('offerNumber').textContent;
            var clientName = document.getElementById('clientName').value.trim();
            var clientPhone = document.getElementById('clientPhone').value.trim();
            var clientEmail = document.getElementById('clientEmail').value.trim();
            var clientAddress = document.getElementById('clientAddress').value.trim();
            
            if (!clientName || !clientPhone || !clientEmail || !clientAddress) {
                showAlert('Грешка', 'Моля попълнете всички полета за клиента!');
                return;
            }
            
            var offer = null;
            var offerIndex = -1;
            
            for (var i = 0; i < offers.length; i++) {
                if (offers[i].id === offerId) {
                    offer = offers[i];
                    offerIndex = i;
                    break;
                }
            }
            
            if (offer) {
                var newPolicyNumber = 'TG-2025-' + String(policies.length + 1).padStart(3, '0');
                var newPolicy = {
                    id: newPolicyNumber,
                    client: clientName,
                    destination: offer.destination,
                    dates: offer.dates,
                    premium: offer.premium,
                    company: offer.company,
                    phone: clientPhone,
                    email: clientEmail,
                    address: clientAddress,
                    travelersCount: offer.travelersCount,
                    status: 'active'
                };

                policies.push(newPolicy);
                
                if (offerIndex > -1) {
                    offers.splice(offerIndex, 1);
                }

                updateOffersTable();
                updatePoliciesTable();

                hideModal('createPolicyModal');
                
                // Show success popup with preview button
                showCustomPopup('Успешно', 'Полицата беше издадена успешно!\nНомер на полица: ' + newPolicyNumber, 
                    function() { viewPolicy(newPolicyNumber); }, null);
                
                showDashboardTab('policies');
            }
        }

        // Preview functions
        function viewOffer(offerId) {
            var offer = null;
            for (var i = 0; i < offers.length; i++) {
                if (offers[i].id === offerId) {
                    offer = offers[i];
                    break;
                }
            }
            
            if (!offer) {
                showAlert('Грешка', 'Офертата не е намерена!');
                return;
            }

            var previewHtml = '';
            previewHtml += '<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">';
            previewHtml += '<h4 style="color: #4CAF50; margin-bottom: 15px;">Оферта ' + offer.id + '</h4>';
            previewHtml += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
            previewHtml += '<div><strong>Клиент:</strong><br>' + offer.client + '</div>';
            previewHtml += '<div><strong>Дестинация:</strong><br>' + offer.destination + '</div>';
            previewHtml += '<div><strong>Период на пътуване:</strong><br>' + offer.dates + '</div>';
            previewHtml += '<div><strong>Застраховател:</strong><br>' + offer.company + '</div>';
            previewHtml += '<div><strong>Премия:</strong><br><span style="font-size: 18px; color: #4CAF50; font-weight: bold;">' + offer.premium + '</span></div>';
            previewHtml += '<div><strong>Брой пътуващи:</strong><br>' + offer.travelersCount + ' души</div>';
            previewHtml += '</div>';
            previewHtml += '</div>';
            
            previewHtml += '<div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #4CAF50;">';
            previewHtml += '<strong>Статус:</strong> Активна оферта<br>';
            previewHtml += '<small style="color: #666;">Офертата е валидна и може да бъде издадена като полица</small>';
            previewHtml += '</div>';

            document.getElementById('offerPreviewContent').innerHTML = previewHtml;
            showModal('offerPreviewModal');
        }

        function viewPolicy(policyId) {
            var policy = null;
            for (var i = 0; i < policies.length; i++) {
                if (policies[i].id === policyId) {
                    policy = policies[i];
                    break;
                }
            }
            
            if (!policy) {
                showAlert('Грешка', 'Полицата не е намерена!');
                return;
            }

            var previewHtml = '';
            previewHtml += '<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">';
            previewHtml += '<h4 style="color: #007bff; margin-bottom: 15px;">Полица ' + policy.id + '</h4>';
            previewHtml += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
            previewHtml += '<div><strong>Клиент:</strong><br>' + policy.client + '</div>';
            previewHtml += '<div><strong>Дестинация:</strong><br>' + policy.destination + '</div>';
            previewHtml += '<div><strong>Период на пътуване:</strong><br>' + policy.dates + '</div>';
            previewHtml += '<div><strong>Застраховател:</strong><br>' + policy.company + '</div>';
            previewHtml += '<div><strong>Премия:</strong><br><span style="font-size: 18px; color: #007bff; font-weight: bold;">' + policy.premium + '</span></div>';
            previewHtml += '<div><strong>Брой пътуващи:</strong><br>' + policy.travelersCount + ' души</div>';
            previewHtml += '</div>';
            
            if (policy.phone) {
                previewHtml += '<hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">';
                previewHtml += '<h5 style="margin-bottom: 15px;">Данни за клиента</h5>';
                previewHtml += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
                previewHtml += '<div><strong>Телефон:</strong><br>' + policy.phone + '</div>';
                previewHtml += '<div><strong>Имейл:</strong><br>' + policy.email + '</div>';
                previewHtml += '<div style="grid-column: 1 / -1;"><strong>Адрес:</strong><br>' + policy.address + '</div>';
                previewHtml += '</div>';
            }
            
            previewHtml += '</div>';
            
            previewHtml += '<div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">';
            previewHtml += '<strong>Статус:</strong> Активна полица<br>';
            previewHtml += '<small style="color: #666;">Полицата е издадена и валидна за периода на пътуването</small>';
            previewHtml += '</div>';

            document.getElementById('policyPreviewContent').innerHTML = previewHtml;
            showModal('policyPreviewModal');
        }

        function updatePoliciesTable() {
            var tbody = document.getElementById('policiesTableBody');
            tbody.innerHTML = '';

            for (var i = 0; i < policies.length; i++) {
                var policy = policies[i];
                var row = tbody.insertRow();
                row.innerHTML = '<td>' + policy.id + '</td>' +
                               '<td>' + policy.client + '</td>' +
                               '<td>' + policy.destination + '</td>' +
                               '<td>' + policy.dates + '</td>' +
                               '<td>' + policy.premium + '</td>' +
                               '<td><span class="badge badge-info">' + policy.company + '</span></td>' +
                               '<td><span class="badge badge-success">Активна</span></td>' +
                               '<td>' +
                               '<button class="btn btn-secondary" onclick="editPolicy(\'' + policy.id + '\')">Редактирай</button>' +
                               '<button class="btn btn-primary" onclick="viewPolicy(\'' + policy.id + '\')">Преглед</button>' +
                               '</td>';
            }
        }

        // Export functionality
        function performExport() {
            var exportType = document.getElementById('exportType').value;
            var fromDate = document.getElementById('exportFromDate').value;
            var toDate = document.getElementById('exportToDate').value;
            var format = document.getElementById('exportFormat').value;

            if (!fromDate || !toDate) {
                showAlert('Грешка', 'Моля изберете период за експорт!');
                return;
            }

            var message = 'Експортиране на ' + exportType + ' от ' + fromDate + ' до ' + toDate + ' във формат ' + format + '...';
            showAlert('Експорт', message);
        }

        function editPolicy(policyId) {
            showAlert('Функция', 'Редактиране на полица: ' + policyId);
        }

        function viewPolicy(policyId) {
            showAlert('Функция', 'Преглед на полица: ' + policyId);
        }

        // Global variables for sorting
        var currentOfferSort = { column: null, direction: null };
        var currentPolicySort = { column: null, direction: null };

        // New sorting functions for offers
        function sortOffersBy(column) {
            // Toggle sort direction
            if (currentOfferSort.column === column) {
                currentOfferSort.direction = currentOfferSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentOfferSort.column = column;
                currentOfferSort.direction = 'asc';
            }

            // Update header styles
            var headers = document.querySelectorAll('#offersTab .sortable');
            for (var i = 0; i < headers.length; i++) {
                headers[i].classList.remove('sort-asc', 'sort-desc');
            }
            
            var currentHeader = document.getElementById(column + 'Header');
            currentHeader.classList.add('sort-' + currentOfferSort.direction);

            // Sort the table
            var tbody = document.getElementById('offersTableBody');
            var rows = [];
            var tbodyRows = tbody.getElementsByTagName('tr');
            
            for (var i = 0; i < tbodyRows.length; i++) {
                rows.push(tbodyRows[i]);
            }

            rows.sort(function(a, b) {
                var aVal, bVal;
                switch(column) {
                    case 'client':
                        aVal = a.cells[1].textContent.trim();
                        bVal = b.cells[1].textContent.trim();
                        break;
                    case 'destination':
                        aVal = a.cells[2].textContent.trim();
                        bVal = b.cells[2].textContent.trim();
                        break;
                    case 'dates':
                        aVal = a.cells[3].textContent.trim();
                        bVal = b.cells[3].textContent.trim();
                        break;
                    case 'premium':
                        aVal = parseFloat(a.cells[4].textContent.replace(/[^\d.]/g, ''));
                        bVal = parseFloat(b.cells[4].textContent.replace(/[^\d.]/g, ''));
                        break;
                    case 'company':
                        aVal = a.cells[5].textContent.trim();
                        bVal = b.cells[5].textContent.trim();
                        break;
                    default:
                        return 0;
                }
                
                var result;
                if (typeof aVal === 'number') {
                    result = aVal - bVal;
                } else {
                    result = aVal.localeCompare(bVal);
                }
                
                return currentOfferSort.direction === 'desc' ? -result : result;
            });

            tbody.innerHTML = '';
            for (var i = 0; i < rows.length; i++) {
                tbody.appendChild(rows[i]);
            }
        }

        // New sorting functions for policies
        function sortPoliciesBy(column) {
            // Toggle sort direction
            if (currentPolicySort.column === column) {
                currentPolicySort.direction = currentPolicySort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentPolicySort.column = column;
                currentPolicySort.direction = 'asc';
            }

            // Update header styles
            var headers = document.querySelectorAll('#policiesTab .sortable');
            for (var i = 0; i < headers.length; i++) {
                headers[i].classList.remove('sort-asc', 'sort-desc');
            }
            
            var currentHeader = document.getElementById('policy' + column.charAt(0).toUpperCase() + column.slice(1) + 'Header');
            currentHeader.classList.add('sort-' + currentPolicySort.direction);

            // Sort the table
            var tbody = document.getElementById('policiesTableBody');
            var rows = [];
            var tbodyRows = tbody.getElementsByTagName('tr');
            
            for (var i = 0; i < tbodyRows.length; i++) {
                rows.push(tbodyRows[i]);
            }

            rows.sort(function(a, b) {
                var aVal, bVal;
                switch(column) {
                    case 'client':
                        aVal = a.cells[1].textContent.trim();
                        bVal = b.cells[1].textContent.trim();
                        break;
                    case 'destination':
                        aVal = a.cells[2].textContent.trim();
                        bVal = b.cells[2].textContent.trim();
                        break;
                    case 'dates':
                        aVal = a.cells[3].textContent.trim();
                        bVal = b.cells[3].textContent.trim();
                        break;
                    case 'premium':
                        aVal = parseFloat(a.cells[4].textContent.replace(/[^\d.]/g, ''));
                        bVal = parseFloat(b.cells[4].textContent.replace(/[^\d.]/g, ''));
                        break;
                    case 'company':
                        aVal = a.cells[5].textContent.trim();
                        bVal = b.cells[5].textContent.trim();
                        break;
                    default:
                        return 0;
                }
                
                var result;
                if (typeof aVal === 'number') {
                    result = aVal - bVal;
                } else {
                    result = aVal.localeCompare(bVal);
                }
                
                return currentPolicySort.direction === 'desc' ? -result : result;
            });

            tbody.innerHTML = '';
            for (var i = 0; i < rows.length; i++) {
                tbody.appendChild(rows[i]);
            }
        }

        // Updated search functions
        function searchOffers() {
            var searchTerm = document.getElementById('searchOffers').value.toLowerCase();
            var tbody = document.getElementById('offersTableBody');
            var rows = tbody.getElementsByTagName('tr');

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var text = row.textContent.toLowerCase();
                row.style.display = text.indexOf(searchTerm) !== -1 ? '' : 'none';
            }
        }

        function searchPolicies() {
            var searchTerm = document.getElementById('searchPolicies').value.toLowerCase();
            var tbody = document.getElementById('policiesTableBody');
            var rows = tbody.getElementsByTagName('tr');

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var text = row.textContent.toLowerCase();
                row.style.display = text.indexOf(searchTerm) !== -1 ? '' : 'none';
            }
        }

        // Remove the old clearOfferSorting and clearPolicySorting functions since we removed the buttons
        function clearOfferSearch() {
            document.getElementById('searchOffers').value = '';
            searchOffers(); // Re-run search to show all items
        }

        function clearPolicySearch() {
            document.getElementById('searchPolicies').value = '';
            searchPolicies(); // Re-run search to show all items
        }

        // Keep the old function for backwards compatibility
        function clearOfferFilters() {
            clearOfferSearch();
        }

        function clearPolicyFilters() {
            clearPolicySearch();
        }

        function clearFilters() {
            document.getElementById('searchOffers').value = '';
            document.getElementById('sortOffers').value = '';
            document.getElementById('filterCompany').value = '';
        }

        function searchPolicies() {
            var searchTerm = document.getElementById('searchPolicies').value.toLowerCase();
            var companyFilter = document.getElementById('filterPolicyCompany').value;
            var tbody = document.getElementById('policiesTableBody');
            var rows = tbody.getElementsByTagName('tr');

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var text = row.textContent.toLowerCase();
                var companyCell = row.cells[5].textContent;
                
                var matchesSearch = text.indexOf(searchTerm) !== -1;
                var matchesCompany = !companyFilter || companyCell.indexOf(companyFilter) !== -1;
                
                row.style.display = (matchesSearch && matchesCompany) ? '' : 'none';
            }
        }

        function sortPolicies() {
            var sortBy = document.getElementById('sortPolicies').value;
            if (!sortBy) return;

            var tbody = document.getElementById('policiesTableBody');
            var rows = [];
            var tbodyRows = tbody.getElementsByTagName('tr');
            
            for (var i = 0; i < tbodyRows.length; i++) {
                rows.push(tbodyRows[i]);
            }

            rows.sort(function(a, b) {
                var aVal, bVal;
                switch(sortBy) {
                    case 'client':
                        aVal = a.cells[1].textContent;
                        bVal = b.cells[1].textContent;
                        break;
                    case 'destination':
                        aVal = a.cells[2].textContent;
                        bVal = b.cells[2].textContent;
                        break;
                    case 'premium':
                        aVal = parseFloat(a.cells[4].textContent.replace(/[^\d.]/g, ''));
                        bVal = parseFloat(b.cells[4].textContent.replace(/[^\d.]/g, ''));
                        break;
                    case 'company':
                        aVal = a.cells[5].textContent;
                        bVal = b.cells[5].textContent;
                        break;
                    default:
                        return 0;
                }
                
                if (typeof aVal === 'number') {
                    return bVal - aVal;
                }
                return aVal.localeCompare(bVal);
            });

            tbody.innerHTML = '';
            for (var i = 0; i < rows.length; i++) {
                tbody.appendChild(rows[i]);
            }
        }

        function filterPolicies() {
            searchPolicies();
        }

        // User management functions
        function addNewUser() {
            var name = document.getElementById('newUserName').value;
            var email = document.getElementById('newUserEmail').value;
            
            if (!name || !email) {
                showAlert('Грешка', 'Моля попълнете всички полета!');
                return;
            }

            showAlert('Успешно', 'Поканата е изпратена успешно на ' + email);
            hideModal('addUserModal');
            
            document.getElementById('newUserName').value = '';
            document.getElementById('newUserEmail').value = '';
        }

        function clearPolicyFilters() {
            document.getElementById('searchPolicies').value = '';
            document.getElementById('sortPolicies').value = '';
            document.getElementById('filterPolicyCompany').value = '';
        }

        function addNewUser() {
            var name = document.getElementById('newUserName').value;
            var email = document.getElementById('newUserEmail').value;
            
            if (!name || !email) {
                showAlert('Грешка', 'Моля попълнете всички полета!');
                return;
            }

            showAlert('Успешно', 'Поканата е изпратена успешно на ' + email);
            hideModal('addUserModal');
            
            document.getElementById('newUserName').value = '';
            document.getElementById('newUserEmail').value = '';
        }

        function editUser(userId) {
            showAlert('Функция', 'Редактиране на потребител: ' + userId);
        }

        function removeUser(userId) {
            showAlert('Функция', 'Премахване на потребител: ' + userId);
        }

        function finalizePolicy() {
            showAlert('Функция', 'Създаването на полици ще бъде добавено скоро...');
        }

        // Initialization
        document.addEventListener('DOMContentLoaded', function() {
            if (currentUserRole === 'admin') {
                document.getElementById('usersNavLink').style.display = 'block';
            }
            updateTravelerButtons();
        });

        // Event listeners
        document.addEventListener('click', function(event) {
            var dropdown = document.getElementById('countryDropdown');
            var input = document.getElementById('travelDestination');
            if (dropdown && input && !dropdown.contains(event.target) && event.target !== input) {
                dropdown.style.display = 'none';
            }
        });

        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
            if (event.target.classList.contains('custom-popup')) {
                hideCustomPopup();
            }
        };
        // === Broker / Master-admin functionality ===

// 1) Master credentials (choose your own secure password!)
var masterUser = { email: 'master@travelxyz.com', password: 'YOUR_MASTER_PASSWORD' };

// 2) In-memory list of agencies (initialize from your real data if you have it)
var agencies = [
  { name: 'Туристическа агенция XYZ', email:'xyz@travelxyz.com', password:'xyzpass' }
];

// 3) Entry point for broker login
function brokerLogin() {
  var email = document.getElementById('brokerEmail').value.trim();
  var pass = document.getElementById('brokerPassword').value.trim();
  if (email === masterUser.email && pass === masterUser.password) {
    document.getElementById('brokerEmail').value = '';
    document.getElementById('brokerPassword').value = '';
    showBrokerScreen();
  } else {
    showAlert('Грешка','Невалидни брокерски данни!');
  }
}


// 4) Show the broker-admin screen and render the list
function showBrokerScreen() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('brokerScreen').classList.add('active');
  renderAgencies();
}

// 5) Populate the UL with agencies
function renderAgencies() {
  var ul = document.getElementById('agenciesList');
  ul.innerHTML = '';
  var q = document.getElementById('agencySearch').value.toLowerCase();
  agencies.forEach((a,i) => {
    if (!q || a.name.toLowerCase().includes(q)) {
      var li = document.createElement('li');
      li.innerHTML = `
        ${a.name}
        <button class="btn btn-primary" onclick="loginAgency(${i})">Login</button>
        <button class="btn btn-secondary" onclick="editAgency(${i})">Edit</button>
        <button class="btn btn-danger" onclick="removeAgency(${i})">Remove</button>
      `;
      ul.appendChild(li);
    }
  });
}

function editAgency(idx) {
  var ag = agencies[idx];
  var name = prompt('Име', ag.name);
  if (name === null) return;
  var email = prompt('Имейл', ag.email);
  if (email === null) return;
  var pass = prompt('Парола', ag.password);
  if (pass === null) return;
  agencies[idx] = { name: name, email: email, password: pass };
  renderAgencies();
}

// 6) Add / remove agencies
function addAgency() {
  var name = document.getElementById('newAgencyName').value.trim();
  if (!name) return showAlert('Грешка','Въведете име!');
  var email = prompt('Email for this agency:');
  var pass = prompt('Password for this agency:');
  agencies.push({ name, email, password: pass });
  renderAgencies();
}
function removeAgency(idx) {
  if (confirm('Сигурни ли сте?')) {
    agencies.splice(idx,1);
    renderAgencies();
  }
}

// 7) Login _into_ a specific agency
function loginAgency(idx) {
  currentUserRole = 'agency';
  currentAgency = agencies[idx];
  showScreen('dashboardScreen');
  updateDashboardForAgency();
}

// 8) After agency login, adjust the dashboard header
function updateDashboardForAgency() {
  // change welcome text
  document.querySelector('#dashboardScreen .user-info span')
    .textContent = 'Добре дошли, ' + currentAgency.name;
  // ensure all normal tabs are visible
  document.getElementById('usersNavLink').style.display = 'none';
  // (optional) lock down features based on role
}

// === end broker / master-admin additions ===
